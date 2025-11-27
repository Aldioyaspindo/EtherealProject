import React from "react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function SizeSelector({ selectedSize, setSelectedSize }) {
  return (
    <div>
      <p className="text-zinc-600 text-lg mb-3">Ukuran</p>
      <div className="flex flex-wrap gap-3">
        {SIZES.map((size) => (
          <label key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="hidden"
            />
            <div
              className={`px-5 py-2 rounded-full text-lg cursor-pointer border ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
              }`}
            >
              {size}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}