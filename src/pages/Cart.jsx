import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./css/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItem } = useCart();

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.cart_id} className="cart-item">   {/* ✅ Unique key */}

                {/* 🖼️ Book Cover */}
                <img
                  src={
                    item.cover
                      ? `http://localhost:5000/uploads/${item.cover}`
                      : "/default-book.jpg"
                  }
                  alt={item.title}
                  className="cart-book-cover"
                />

                <div className="cart-item-details">
                  <h4>{item.title}</h4>

                  <p>
                    Quantity:{" "}
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateCartItem(item.cart_id, item.quantity - 1) // ✅ cart_id use karo
                      }
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateCartItem(item.cart_id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </p>

                  <p>Price: ₹{Number(item.price).toFixed(2)}</p>
                  <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>

                  <button onClick={() => removeFromCart(item.cart_id)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="cart-total">Total: ₹{total.toFixed(2)}</div>
            <button onClick={() => navigate("/checkout", { state: { total } })}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
