import axios from "axios";
const API_URL ="https://6aec95f2fc3b911e6fd564ec.mockapi.io/shopkart";

const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response;
};
// Task 5, Step 1: Create getProductDetails function
const getProductDetails = async () => {
  const response = await axios.get(`${API_URL}/productDetails`);
  return response;
};

// Task 5, Step 2: Export both functions
export { getProducts, getProductDetails };