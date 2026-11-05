// src/pages/ProductDetails.jsx

import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productDetails from "../data/productDetails";
import "./ProductDetails.css";

function ProductDetails({ dispatch }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Find product by id from URL params
  const product = productDetails.find((item) => item.id === Number(id));

  // Helper function to format specification keys (e.g. wheelType -> Wheel Type)
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) => letter.toUpperCase());
  };

  // Add to cart handler
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  // Buy now handler
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
    navigate("/cart");
  };

  // Handle invalid/missing product ID
  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products">Back to Products</Link>
      </main>
    );
  }

  return (
    <main className="product-details-container">
      {/* Product Overview Section */}
      <section className="product-overview">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info-section">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-brand">Brand: {product.brand}</p>

          <div className="product-rating">
            ⭐ {product.rating} <span>({product.reviews} reviews)</span>
          </div>

          <p className="product-short-description">{product.shortDescription}</p>

          {/* Pricing */}
          <div className="product-pricing">
            <span className="current-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="original-price">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="discount">{product.discount} OFF</span>
          </div>

          {/* Availability */}
          <div className="product-availability">
            <strong>{product.availability}</strong>
            <p>Free delivery available on eligible orders.</p>
          </div>

          {/* Quantity Controls & Buttons */}
          <div className="purchase-section">
            <div className="quantity-section">
              <span>Quantity</span>
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => setQuantity((previous) => Math.max(1, previous - 1))}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((previous) => previous + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="purchase-buttons">
              <button className="add-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="product-description-section">
        <h2>Product Description</h2>
        <p>{product.description}</p>
      </section>

      {/* Key Features */}
      <section className="product-features-section">
        <h2>Key Features</h2>
        <ul>
          {product.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Specifications */}
      <section className="specifications-section">
        <h2>Specifications</h2>
        <div className="specifications-grid">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key}>
              <strong>{formatKey(key)}</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="product-reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-list">
          {product.customerReviews.map((review, index) => (
            <article className="review-card" key={index}>
              <h3>{review.name}</h3>
              <p className="review-rating">⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;