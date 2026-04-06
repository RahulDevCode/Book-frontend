import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = cart.length;
console.log("✅ Header me user mila:", user); 

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <h1 className="logo">
          <Link to="/"> Book Haven</Link>
        </h1>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/cart" className="cart-icon" aria-label={`View cart, ${cartItemCount} items`}>
            🛒 <span className="cart-count">{cartItemCount}</span>
          </Link>
       
          

          {user ? (
            <>       
              <span className="welcome">Hi,{user.email}</span>
       
              <button onClick={logout} className="btn logout-btn">Logout</button>
      
            </>
          ) : (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
