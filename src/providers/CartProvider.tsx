import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, useContext, useState } from "react";

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
  const [items, setItems] = useState<CartItem[]>([]);
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
    // Here you can implement checkout logic, e.g., sending order to server
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>{children}</CartContext.Provider>
  );
}
export default CartProvider;

export const useCart = () => useContext(CartContext);
