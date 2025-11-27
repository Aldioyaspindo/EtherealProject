import { addToCart } from "./api";
import toast from "react-hot-toast";

export const handleAddToCart = async ({
  selectedSize,
  sessionId,
  catalog,
  quantity,
}) => {
  if (!selectedSize) {
    toast.error("Silakan pilih ukuran terlebih dahulu.");
    return;
  }

  if (!sessionId) {
    toast.error("Session belum siap, coba lagi sebentar.");
    
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

export const handleOrderWhatsApp = ({ selectedSize, catalog, quantity, user }) => {
  if (!selectedSize) {
    toast.error("Silakan pilih ukuran terlebih dahulu.", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "linear-gradient(#f5576c 100%)",
          color: "white",
          padding: "16px 20px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(245, 87, 108, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          minWidth: "320px",
        },
      });
    return;
  }

  const adminPhoneNumber = "62895415019150";
    // Hitung total harga
  const totalPrice = catalog.productPrice * quantity;
  const message = ` Halo, saya ingin memesan:

*Produk:* ${catalog.productName}
*Warna:* ${catalog.productColor}
*Ukuran:* ${selectedSize}
*Jumlah:* ${quantity} pcs
*Harga (per pcs):* Rp ${catalog.productPrice.toLocaleString("id-ID")}
*Total Harga:* Rp ${totalPrice.toLocaleString("id-ID")}

Mohon info lanjut untuk total dan pengiriman. Terima kasih!`.trim();


  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
};