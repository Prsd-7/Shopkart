// src/pages/Products.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Products.css";
import "./Sort-DropDown.css";
import "./Pagination.css"; // Task 2, Step 8: Style the Pagination buttons

function Products({ dispatch, products = [] }) {
  const navigate = useNavigate();

  // Task 1: Sorting state
  const [sortOption, setSortOption] = useState("");

  // Existing Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);

  // Task 2, Step 1: Create Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Task 1: Shallow copy for sorting
  let sortedProducts = [...filteredProducts];

  if (sortOption === "price-low") {
    sortedProducts.sort(
      (a, b) =>
        Number(String(a.price).replace(/,/g, "")) -
        Number(String(b.price).replace(/,/g, ""))
    );
  }
  if (sortOption === "price-high") {
    sortedProducts.sort(
      (a, b) =>
        Number(String(b.price).replace(/,/g, "")) -
        Number(String(a.price).replace(/,/g, ""))
    );
  }
  if (sortOption === "rating-high") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  if (sortOption === "rating-low") {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  }
  if (sortOption === "popular") {
    sortedProducts.sort((a, b) => b.reviews - a.reviews);
  }

  // Task 2, Step 2: Calculate the Total Number of Pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Task 2, Step 3: Slice the Current Page Products
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Task 2, Step 6: Reset Pagination When Sorting Changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  // Task 2, Step 7: Reset Pagination When Filters Change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

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

          <div className="sort-section">
            <label htmlFor="sort">Sort By: </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
              <option value="rating-low">Rating: Low to High</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </section>

        {/* Task 2, Step 4: Display Current Page Products */}
        <div className="products-grid">
          {sortedProducts.length > 0 ? (
            currentProducts.map((product) => (
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

        {/* Task 2, Step 5: Create Pagination Buttons */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((previous) => Math.max(previous - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((previous) => Math.min(previous + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;