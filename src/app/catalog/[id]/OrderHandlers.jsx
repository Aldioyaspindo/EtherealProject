import { addToCart } from "./api";

export const handleAddToCart = async ({
  selectedSize,
  sessionId,
  catalog,
  quantity,
}) => {
  if (!selectedSize) {
    alert("Silakan pilih ukuran terlebih dahulu.");
    return;
  }

  if (!sessionId) {
    alert("Session belum siap, coba lagi sebentar.");
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
    alert("Silakan pilih ukuran terlebih dahulu.");
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