import "./css/Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // ✅ cart total from navigation state
  const cartTotal = location.state?.total || 0;

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    amount: cartTotal, // ✅ cart se aya hua total
  });

  // ✅ Agar user login nahi hai to redirect
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
  }, [user, navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return user ? (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />

          {/* ✅ Show total */}
          <div className="order-summary">
            <p><strong>Total:</strong> ₹{cartTotal.toFixed(2)}</p>
          </div>

          <button type="submit">Pay ₹{cartTotal.toFixed(2)}</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default Checkout;
