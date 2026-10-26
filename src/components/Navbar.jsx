import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      {/* Top Shipping Bar */}
      <div className="top-bar">
        <div className="container-fluid">
          <span className="new-badge">NEW</span>
          Free shipping on orders above ₹499 | Easy 7-day returns
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img
              src="/images/logo.png"
              alt="ShopKart"
              className="shopkart-logo"
            />
          </Link>

          <div className="dropdown category-dropdown">
            <button
              className="category-btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              All Categories
            </button>

            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#categories">Electronics</a></li>
              <li><a className="dropdown-item" href="#categories">Fashion</a></li>
              <li><a className="dropdown-item" href="#categories">Home & Kitchen</a></li>
              <li><a className="dropdown-item" href="#categories">Beauty & Personal Care</a></li>
              <li><a className="dropdown-item" href="#categories">Sports & Fitness</a></li>
              <li><a className="dropdown-item" href="#categories">Books & Stationery</a></li>
            </ul>
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#shopKartNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="shopKartNavbar">
            <ul className="navbar-nav main-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#deals">Deals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>

            {/* Search */}
            <div className="search-box">
              <input type="text" placeholder="Search for products..." />
              <button className="search-btn" type="button">
                <img src="/icons/search-icon.png" alt="Search" />
              </button>
            </div>

            {/* Icons */}
            <div className="nav-actions">
              <img src="/icons/heart.png" alt="Wishlist" className="nav-icon" />

              <div className="cart-wrapper">
                <img
                  src="/icons/cart-icon.png"
                  alt="Cart"
                  className="nav-icon"
                />
                <span className="cart-count">3</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;