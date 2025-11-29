import axios from "axios";

// Buat axios instance dengan config yang benar
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true, // PENTING!
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk debug
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    console.log("With Credentials:", config.withCredentials);
    console.log("Document Cookies:", document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk debug
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// ===== API Functions =====

export const login = async (username, password) => {
  const res = await api.post("/customer/login", { username, password });
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add", { productId, quantity });
  return res.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const res = await api.put("/cart/update", { itemId, quantity });
  return res.data;
};

export const removeCartItem = async (itemId) => {
  const res = await api.delete(`/cart/item/${itemId}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};

export default api;
