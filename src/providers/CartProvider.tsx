import { useInsertOrder } from "@/api/orders";
import { CartItem, Product, Tables } from "@/types";
import { randomUUID } from "expo-crypto";
import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useInsertOrderItems } from "@/api/order-items";

type CartType = {
  items: CartItem[];
  total: number;
  addItem: (product: Product, size: CartItem['size'],) => void;
  updateQuantity: (itemId: string, delta: -1 | 1) => void;
  checkout: () => void;
}
const CartContext = createContext<CartType>({
  items: [],
  total: 0,
  addItem: () => { },
  updateQuantity: () => { },
  checkout: () => { },
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const { isAdmin } = useAuth();
  const addItem = (product: Product, size: CartItem['size'],) => {
    const existingItem = items.find((item) => item.product_id === product.id && item.size === size);
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: randomUUID(),
    };
    setItems((prevItems) => [...prevItems, newCartItem]);
  }
  const updateQuantity = (itemId: string, delta: -1 | 1) => {

    setItems((prevItems) => {
      return prevItems
        .map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  }
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const checkout = () => {
    insertOrder({ total: 0 }, {
      onSuccess: (data: Tables<'orders'>) => {
        saveOrderItem(data);
      },
      onError: (error) => {
        console.error('Error creating order:', error);
      }
    });

  }
  const saveOrderItem = (order: Tables<'orders'>) => {
    insertOrderItems(items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
    })), {
      onSuccess: () => {
        setItems([]);

        if (isAdmin) {
          router.navigate(`/(admin)/orders/${order.id}`);
        } else {
          router.navigate(`/(user)/orders/${order.id}`);
        }
      }, onError: (error) => {
        console.error('Error saving order items:', error);
      }
    });
  }
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>{children}</CartContext.Provider>
  );
}
export default CartProvider;

export const useCart = () => useContext(CartContext);
