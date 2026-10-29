import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import React, { useState, useEffect, useReducer } from "react";

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

function App() {
  // 1. Declare all state and reducers first
  const [userName, setUserName] = useState("");
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);

  // 2. Load cart from localStorage on mount
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

  // 3. Persist cart to localStorage only after initial load finishes
  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartLoaded]);

  return (
    <>
      <Navbar userName={userName} cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products dispatch={dispatch} />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/register" element={<Register setUserName={setUserName} />} />
        <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} />} />
      </Routes>
    </>
  );
}

export default App;