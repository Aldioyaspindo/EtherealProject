"use client";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToCart } from "../lib/api"; // ✅ Import dari api.js

export default function CatalogCards({ item }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      setLoading(true);
      const data = await addToCart(item._id, 1);
      toast.success(`${item.productName} ditambahkan ke keranjang!`, {
        duration: 3000,
        position: "bottom-center",
        style: {
          background: "#1f2937",
          color: "white",
          padding: "12px 24px",
          borderRadius: "999px",
          fontSize: "14px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        },
      });
    } catch (err) {
      console.error("Error add to cart:", err);

      if (err.response?.data?.requireAuth) {
        toast.error("Silakan login terlebih dahulu");
        setTimeout(() => router.push("/login"), 1000);
        return;
      }

      toast.error(`Gagal: ${err.response?.data?.message || err.message}`, {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition`}
    >
      <Link href={`/catalog/${item._id}`} className="block flex-grow">
        {/* Gambar seragam seperti contoh */}
        <div className="w-full aspect-[3/4] overflow-hidden">
          <Image
            src={item.productImage}
            alt={item.productName}
            width={500}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-1 h-19 flex flex-col text-left">
          <h3 className="text-sm sm:text-sm md:text-lg lg:text-xl text-black mb-1 sm:mb-2 truncate">
            {item.productName}
          </h3>

          <div className="flex items-baseline gap-1">
            <p className="text-sm sm:text-base text-[#011C83] font-medium">
              Rp
            </p>
            <p className="text-[#011C83] font-semibold text-base sm:text-lg md:text-xl">
              {item.productPrice?.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </Link>

      <div className="px-2 pb-4 pt-0 flex justify-between items-center">
        <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
          Stok: {item.productTotal}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Tambah ke Keranjang"
        >
          <FaShoppingCart
            className={`text-lg ${
              loading ? "text-gray-400" : "text-black hover:text-blue-900"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
