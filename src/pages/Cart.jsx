import './Cart.css';
import { Link } from 'react-router-dom';
import React, { useState } from "react";

function Cart({ cart = [], dispatch }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 1. Calculate Subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(String(item.price).replace(/,/g, "")) * item.quantity,
    0
  );

  // 2. Calculate Discount
  let discountPercentage = 0;
  if (subtotal >= 5000) {
    discountPercentage = 25;
  } else if (subtotal >= 3500) {
    discountPercentage = 20;
  } else if (subtotal >= 2000) {
    discountPercentage = 10;
  }
  const discount = (subtotal * discountPercentage) / 100;

  // 3. Calculate Shipping
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 40;

  // 4. Calculate Total Amount
  const totalAmount = subtotal - discount + shipping;

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some products to your cart to continue shopping.</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-container">
            {/* Cart Table */}
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr className="cart-item-row" key={item.id}>
                      <td>
                        <div className="cart-product">
                          <div className="cart-product-image">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="cart-product-info">
                            <h3>{item.name}</h3>
                            <p className="cart-category">{item.category}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="cart-price">
                          <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                          <span className="original-price">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: item.id,
                              })
                            }
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: item.id,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>
                        <strong className="item-total">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_ITEM",
                              payload: item.id,
                            })
                          }
                        >
                          <img src="/icons/delete-icon.png" alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Clear Cart */}
              <div className="cart-footer">
                <button
                  type="button"
                  className="clear-cart-btn"
                  onClick={() =>
                    dispatch({
                      type: "CLEAR_CART",
                    })
                  }
                >
                  <img src="/icons/clear-cart.png" alt="" />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="cart-sidebar">
              <div className="order-summary">
                <h2>Order Summary</h2>

                {/* Subtotal */}
                <div className="summary-row">
                  <span>
                    Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                  </span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {/* Discount */}
                <div className="summary-row discount-row">
                  <span>Discount</span>
                  <span>−₹{discount.toLocaleString("en-IN")}</span>
                </div>

                {/* Shipping */}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "free-shipping" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                <div className="summary-divider"></div>

                {/* Total Amount */}
                <div className="summary-total">
                  <span>Total Amount</span>
                  <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                </div>

                {discount > 0 && (
                  <p className="saved-message">
                    You saved ₹{discount.toLocaleString("en-IN")} on this order
                  </p>
                )}

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => setOrderPlaced(true)}
                >
                  Proceed to Checkout
                  <span>→</span>
                </button>

                <button type="button" className="coupon-btn">
                  <img src="/icons/coupon.png" alt="" />
                  Apply Coupon
                </button>
              </div>

              {/* Secure Payment */}
              <div className="secure-box">
                <img src="/icons/security-icon.png" alt="" className="secure-icon" />
                <div>
                  <h3>Safe & Secure Payments</h3>
                  <p>100% secure payments. Easy returns. Your data is protected.</p>
                </div>
              </div>
            </aside>
          </div>

          {/* Continue Shopping */}
          <div className="cart-navigation">
            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </>
      )}

      {/* Order Placed Popup */}
      {orderPlaced && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been placed successfully.</p>
            <button
              type="button"
              className="popup-ok-btn"
              onClick={() => setOrderPlaced(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;