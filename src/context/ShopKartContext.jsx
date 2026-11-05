// src/context/ShopKartContext.jsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import { getProducts, getProductDetails } from "../services/service";

const ShopKartContext = createContext();


function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    case "DECREASE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
}

function ShopKartProvider({ children }) {
  // Step 4 & 6: Move states inside Provider
  const [userName, setUserName] = useState("");
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);
const [productDetails, setProductDetails] = useState([]);
  // Task 4, Step 2: Store Products, Loading, and Error Globally
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 5: Move localStorage Logic inside Provider
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        dispatch({
          type: "LOAD_CART",
          payload: JSON.parse(savedCart),
        });
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartLoaded]);

  // Task 4, Step 4: Fetch Products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Unable to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const response = await getProductDetails();
      setProductDetails(response.data);
    } catch (error) {
      console.log("Unable to load product details.");
    }
  };

  fetchProductDetails();
}, []);

  
  return (
    <ShopKartContext.Provider
      value={{
        cart,
        dispatch,
        userName,
        setUserName,
        products,     // <-- Added for Task 4
        setProducts,  // <-- Added for Task 4
        loading,      // <-- Added for Task 4
        error,        // <-- Added for Task 4
        productDetails
      }}
    >
      {children}
    </ShopKartContext.Provider>
  );
}

export { ShopKartContext, ShopKartProvider };