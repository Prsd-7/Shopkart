// src/pages/Products.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Products.css";

function Products({ dispatch }) {
  const navigate = useNavigate();

  // State management
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [addedProductId, setAddedProductId] = useState(null);

  // Filter and sort logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="products-page">
      <Navbar />

      <main className="products-container">
        {/* Filters and Search Bar Section */}
        <section className="filter-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </section>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                title="Click for more info"
              >
                {/* Product Image Area */}
                <div
                  className="product-image"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.discount && (
                    <span className="discount-badge">-{product.discount}</span>
                  )}

                  <button
                    className="wishlist-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ♡
                  </button>

                  <img src={product.image} alt={product.name} />
                </div>

                {/* Product Information Area */}
                <div
                  className="product-info"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <small>{product.category}</small>
                  <h3>{product.name}</h3>

                  <div className="rating">
                    ⭐ {product.rating} <span>({product.reviews})</span>
                  </div>

                  <div className="product-price">
                    ₹{product.price} <del>₹{product.originalPrice}</del>
                  </div>

                  <button
                    className="add-cart-button"
                    onClick={(e) => {
                      e.stopPropagation();

                      dispatch({
                        type: "ADD_ITEM",
                        payload: product,
                      });

                      setAddedProductId(product.id);

                      setTimeout(() => {
                        setAddedProductId(null);
                      }, 2000);
                    }}
                  >
                    {addedProductId === product.id ? (
                      <>✓ Added to Cart</>
                    ) : (
                      <>🛒 Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <h3>No Products Found!</h3>
              <p>Try changing your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Products;