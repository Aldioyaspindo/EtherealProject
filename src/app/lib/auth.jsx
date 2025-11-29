// frontend/src/lib/auth.js
import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/api/users/login", { email, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login gagal";
  }
};
