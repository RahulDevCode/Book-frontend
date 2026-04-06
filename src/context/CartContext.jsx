import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userId = 1; // ✅ abhi ke liye static (baad me login user ka id use karna)

  // 🔄 Backend se cart reload karne ka function
  const loadCart = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await res.json();
      setCart(data);
      console.log("🛒 Cart fetched from backend:", data);
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  };

  // 🟢 Mount hone pe cart load
  useEffect(() => {
    loadCart();
  }, [userId]);

  // 🟢 Add item to cart
  const addToCart = async (book) => {
    try {
      console.log("📗 Book object received in addToCart:", book);

      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          book_id: book.id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      console.log("📩 Response after adding to cart:", data);

      if (!res.ok) throw new Error(data.message);

      // ✅ Reload cart
      loadCart();
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  // 🟢 Update cart item
  const updateCartItem = async (id, quantity) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // ✅ Reload cart
      loadCart();
    } catch (err) {
      console.error("❌ Error updating cart:", err);
    }
  };

  // 🟢 Remove cart item
  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // ✅ Reload cart
      loadCart();
    } catch (err) {
      console.error("❌ Error removing cart item:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
