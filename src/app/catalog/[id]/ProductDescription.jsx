import React from "react";

export default function ProductDescription({ description }) {
  return (
    <div className="max-w-7xl mx-auto mt-16 bg-gray-100 rounded-xl p-8 shadow">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
        Deskripsi Produk
      </h2>
      <p className="text-gray-800 text-lg leading-relaxed">{description}</p>
    </div>
  );
}
