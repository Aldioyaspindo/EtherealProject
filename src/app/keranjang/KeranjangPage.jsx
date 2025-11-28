"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function CartPage() {
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // Item yang dipilih
  const router = useRouter();

  // Ambil user yang login dari cookie token
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/customer/me`,
          { withCredentials: true }
        );

        const data = res.data;

        if (data?.user?._id) {
          setUserId(data.user._id);
        } else {
          console.log(
            "User belum login (respon sukses, tapi data user kosong)"
          );
        }
      } catch (err) {
        console.error("Error fetching user:", err);

        const status = err.response?.status;
        const message = err.response?.data?.message || "Sesi berakhir.";

        if (status === 401) {
          alert(`Silahkan Login Terlebih Dahulu`);
          setTimeout(() => {
            router.push("/register");
          }, 1000);
        }

        console.error("Kesalahan lainnya:", err.message);
      }
    }

    fetchUser();
  }, []);

  // Ambil cart user
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cart`,
          { withCredentials: true }
        );
        setCart(res.data.cart);
        // Select all items by default
        if (res.data.cart?.items) {
          setSelectedItems(res.data.cart.items.map(item => item._id));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [userId]);

  // Toggle checkbox item
  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Select/Deselect All
  const toggleSelectAll = () => {
    if (selectedItems.length === cart.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.items.map(item => item._id));
    }
  };

  // Update quantity (tambah/kurang)
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Minimum 1

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/update`,
        { itemId, quantity: newQuantity },
        { withCredentials: true }
      );

      const data = res.data;
      setCart(data.cart);
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Gagal mengubah jumlah produk");
    }
  };

  // Hapus item
  const handleRemove = async (itemId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${userId}/${itemId}`,
        { withCredentials: true }
      );

      const data = res.data;
      setCart(data.cart);
      // Remove from selected items
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Gagal menghapus produk");
    }
  };

  // Hitung total harga item yang dipilih
  const calculateSelectedTotal = () => {
    if (!cart || !cart.items) return 0;
    
    return cart.items
      .filter(item => selectedItems.includes(item._id))
      .reduce((total, item) => {
        const product = item.product || {};
        return total + (product.productPrice * item.quantity);
      }, 0);
  };

  // Handler untuk order via WhatsApp
  const orderHandler = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Pilih minimal satu produk untuk dipesan!");
      return;
    }

    // Filter hanya item yang dipilih
    const itemsToOrder = cart.items.filter(item => selectedItems.includes(item._id));

    // Buat pesan WhatsApp
    let message = "Halo, saya ingin memesan:\n\n";

    itemsToOrder.forEach((item, index) => {
      const product = item.product || {};
      message += `*Produk ${index + 1}:*\n`;
      message += `Nama: ${product.productName || "Tidak tersedia"}\n`;
      
      // Tambahkan warna jika ada
      if (product.productColor) {
        message += `Warna: ${product.productColor}\n`;
      }
      
      // Tambahkan ukuran jika ada
      if (product.productSize) {
        message += `Ukuran: ${product.productSize}\n`;
      }
      
      message += `Jumlah: ${item.quantity} pcs\n`;
      message += `Harga (per pcs): Rp ${product.productPrice?.toLocaleString("id-ID") || 0}\n`;
      message += `Subtotal: Rp ${(product.productPrice * item.quantity)?.toLocaleString("id-ID") || 0}\n`;
      message += `\n`;
    });

    const totalSelected = calculateSelectedTotal();
    message += `*Total Keseluruhan: Rp ${totalSelected?.toLocaleString("id-ID") || 0}*\n\n`;
    message += "Mohon info lanjut untuk total dan pengiriman. Terima kasih!";

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Nomor WhatsApp toko
    const whatsappNumber = "62895415019150";

    // Buka WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  // Render
  if (!cart) return <p className="p-6">Memuat keranjang...</p>;

  const totalSelected = calculateSelectedTotal();

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-semibold mb-6">Keranjang Saya</h1>

      {!cart.items || cart.items.length === 0 ? (
        <p>Keranjang kamu masih kosong.</p>
      ) : (
        <>
          {/* Select All Checkbox */}
          <div className="mb-4 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              checked={selectedItems.length === cart.items.length}
              onChange={toggleSelectAll}
              className="w-5 h-5 cursor-pointer accent-blue-900"
            />
            <label className="font-medium cursor-pointer" onClick={toggleSelectAll}>
              Pilih Semua ({cart.items.length})
            </label>
          </div>

          <ul className="space-y-4">
            {cart.items.map((item) => {
              const product = item.product || {};
              const imgSrc = product.productImage
                ? `${process.env.NEXT_PUBLIC_API_URL}/${product.productImage}`
                : "/placeholder.png";
              
              const isSelected = selectedItems.includes(item._id);

              return (
                <li
                  key={item._id}
                  className={`flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition ${
                    isSelected ? 'border-blue-900 bg-blue-50' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectItem(item._id)}
                    className="w-5 h-5 cursor-pointer accent-blue-900"
                  />

                  <Link
                    href={`/catalog/${product._id}`}
                    className="flex items-center gap-4 flex-1"
                  >
                    <Image
                      src={product.productImage}
                      alt={product.productName || "Produk"}
                      width={500}
                      height={500}
                      className="w-24 h-24 object-cover rounded-md border"
                    />

                    <div className="flex-1">
                      <h2 className="text-lg font-medium">
                        {product.productName}
                      </h2>
                      <p className="text-gray-700 font-semibold mt-1">
                        Rp {product.productPrice?.toLocaleString("id-ID") || 0}
                      </p>
                    </div>
                  </Link>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 font-bold text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-sm font-semibold text-blue-900">
                      Rp {(product.productPrice * item.quantity)?.toLocaleString("id-ID") || 0}
                    </p>

                    {/* Hapus Button */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Total & Order Button */}
      {cart.items && cart.items.length > 0 && (
        <div className="mt-6 flex justify-between items-center p-4 bg-gray-50 rounded-lg border-t-2 border-blue-900">
          <div>
            <p className="text-sm text-gray-600">
              Total ({selectedItems.length} produk dipilih):
            </p>
            <p className="font-bold text-2xl text-blue-900">
              Rp {totalSelected?.toLocaleString("id-ID") || 0}
            </p>
          </div>
          <button
            onClick={orderHandler}
            disabled={selectedItems.length === 0}
            className="bg-blue-900 flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <span>Pesan Sekarang</span>
            <FaWhatsapp className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}