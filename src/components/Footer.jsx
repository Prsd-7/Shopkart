// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            Shop<span>Kart</span>
          </div>
          <p>Your one-stop destination for all your shopping needs. Good Choices. Great Prices.</p>
          
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Customer Service */}
        <div className="footer-column">
          <h3>Customer Service</h3>
          <a href="#">Help Center</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Order Tracking</a>
        </div>

        {/* Contact Us */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <a href="mailto:support@shopkart.com">support@shopkart.com</a>
          <a href="tel:+919876543210">+91 98765 43210</a>
        </div>

        {/* Payment Section */}
        <div className="footer-payments">
          <h3>Payment Methods</h3>
          <div className="payment-methods">
            <div className="payment">
              <img src="/icons/visa.png" alt="Visa" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="payment">
              <img src="/icons/mastercard.png" alt="Mastercard" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="payment">
              <img src="/icons/upi.png" alt="UPI" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
          
          <div className="secure-payment">
            <div className="lock-icon">
              <img src="/icons/secure.png" alt="Secure Lock" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <span>100% Secure SSL Checkout</span>
          </div>
        </div>
        
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ShopKart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;