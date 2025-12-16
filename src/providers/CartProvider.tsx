import { CartItem, Product } from "@/types";
import { createContext, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size'],) => void;
}
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem['size'],) => {
    setItems((prevItems: CartItem[]) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Ensure to provide all required CartItem properties (id, product_id, etc.)
        const newCartItem: CartItem = {
          id: `${product.id}-${size}`, // or use a better unique id strategy if needed
          product_id: product.id,
          product,
          size,
          quantity: 1,
        };
        return [...prevItems, newCartItem];
      }
    });
  }
  const cart = {
    items: [],
    totalAmount: 0,
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>{children}</CartContext.Provider>
  );
}
export default CartProvider;

export const useCart = () => useContext(CartContext);
