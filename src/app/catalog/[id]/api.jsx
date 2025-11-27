import axios from "axios";
import Cookies from "js-cookie"; // Pastikan import ini digunakan

// Ambil detail produk (kode ini sudah benar)
export const fetchCatalogById = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/catalogs/${id}`
  );
  return response.data.data;
};

export const addToCart = async ({ productId, quantity }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Kirim cookies otomatis
      body: JSON.stringify({
        productId,
        quantity: quantity || 1,
        // HAPUS sessionId (tidak dipakai lagi)
      }),
    });

    const data = await res.json();

        // 🔥 Cek apakah backend mengirim 401 karena belum login
    if (res.status === 401) {
      const data = await res.json();

      if (data.needRegister) {
        // Redirect ke halaman register
        window.location.href = "/register";
        return;
      }
    }

    return data.cart;
  } catch (error) {
    console.error("Error add to cart:", error.message);
    throw error;
  }
};
