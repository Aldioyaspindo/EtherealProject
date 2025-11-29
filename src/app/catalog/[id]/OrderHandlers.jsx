import { addToCart } from "./api";
import toast from "react-hot-toast";
export const handleAddToCart = async ({
  selectedSize,
  sessionId,
  catalog,
  quantity,
}) => {
  if (!selectedSize) {
    toast.error("Silakan pilih ukuran terlebih dahulu.", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "#ffffff",
          color: "black",
          padding: "16px 20px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(245, 87, 108, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          minWidth: "320px",
        },
      });
    return;
  }

  if (!sessionId) {
    toast.error("Session belum siap, coba lagi sebentar.", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "#ffffff",
          color: "black",
          padding: "16px 20px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(245, 87, 108, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          minWidth: "320px",
        },
      });
    return;
  }

  try {
    await addToCart({
      sessionId,
      productId: catalog._id,
      quantity,
    });

    alert(`${catalog.productName} ditambahkan ke keranjang!`);
  } catch (err) {
    console.error("Error:", err);
    alert(`Gagal menambahkan: ${err.message}`);
  }
};

export const handleOrderWhatsApp = ({ selectedSize, catalog, quantity }) => {
  if (!selectedSize) {
    // toast
    toast.error("Silakan pilih ukuran terlebih dahulu", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "#ffffff",
          color: "black",
          padding: "16px 20px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(245, 87, 108, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          minWidth: "320px",
        },
      });
    return;
  }

  const adminPhoneNumber = "628183200450";
  const message = ` Halo, saya ingin memesan:

*Produk:* ${catalog.productName}
*Warna:* ${catalog.productColor}
*Ukuran:* ${selectedSize}
*Jumlah:* ${quantity} pcs
*Harga (per pcs):* Rp ${catalog.productPrice.toLocaleString("id-ID")}

Mohon info lanjut untuk total dan pengiriman. Terima kasih!`.trim();

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
};
