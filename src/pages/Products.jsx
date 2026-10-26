import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Products.css";

const productsData = [
  {
    id: 1,
    name: "Samsung Galaxy M14 5G",
    category: "Electronics",
    price: "12,499",
    originalPrice: "14,999",
    rating: 4.4,
    reviews: 1850,
    discount: "17%",
    isAvailable: true,
    image: "/images/products/Samsung_phone.png",
  },
];

function Products() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState("");

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(selectedRating === rating ? 0 : rating);
  };

  const handleAvailabilityChange = (value) => {
    setAvailability(availability === value ? "" : value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(20000);
    setSelectedRating(0);
    setAvailability("");
  };

  const filteredProducts = productsData.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch =
      Number(product.price.toString().replace(/,/g, "")) <= maxPrice;

    const ratingMatch = product.rating >= selectedRating;

    const availabilityMatch =
      availability === "" ||
      (availability === "inStock" && product.isAvailable) ||
      (availability === "outOfStock" && !product.isAvailable);

    return categoryMatch && priceMatch && ratingMatch && availabilityMatch;
  });

  return (
    <>
      <Navbar />

      <main className="products-page">
        <section className="products-banner">
          <div className="banner-content">
            <h1>
              All <span>Products</span>
            </h1>
            <p>Explore our wide range of top quality products</p>
          </div>
        </section>

        <section className="products-content">
          <aside className="filter-sidebar">
            <div className="filter-title">
              <h3>FILTERS</h3>
              <button type="button" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <h4>Categories</h4>
              {[
                "Electronics",
                "Fashion",
                "Home & Kitchen",
                "Beauty",
                "Sports",
                "Books",
              ].map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <input
                type="range"
                min="199"
                max="20000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-range">
                <span>₹199</span>
                <span>₹{maxPrice}</span>
              </div>
            </div>

            <div className="filter-group">
              <h4>Ratings</h4>
              {[5, 4, 3].map((rating) => (
                <label key={rating}>
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {"⭐".repeat(rating)} & above
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Availability</h4>
              <label>
                <input
                  type="checkbox"
                  checked={availability === "inStock"}
                  onChange={() => handleAvailabilityChange("inStock")}
                />
                In Stock
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={availability === "outOfStock"}
                  onChange={() => handleAvailabilityChange("outOfStock")}
                />
                Out of Stock
              </label>
            </div>
          </aside>

          <div className="products-area">
            <div className="products-header">
              <p>
                Showing {filteredProducts.length} of {productsData.length} products
              </p>
            </div>

            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <div className="product-image">
                      {product.discount && (
                        <span className="discount-badge">
                          -{product.discount}
                        </span>
                      )}
                      <button type="button" className="wishlist-button">
                        ♡
                      </button>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <small>{product.category}</small>
                      <h3>{product.name}</h3>
                      <div className="rating">
                        ⭐ {product.rating}
                        <span> ({product.reviews})</span>
                      </div>
                      <div className="product-price">
                        ₹{product.price}
                        {product.originalPrice && (
                          <del>₹{product.originalPrice}</del>
                        )}
                      </div>
                      <button type="button" className="add-cart-button">
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <h3>No Products Found !</h3>
                  <p>Try changing your filters.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Products;