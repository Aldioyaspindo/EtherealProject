import React from "react";

export default function ProductImage({ imageUrl, productName }) {
  if (!imageUrl) return null;

  return (
    <div className="w-full h-[760px] bg-gray-100 rounded-xl overflow-hidden shadow-md">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
        alt={productName}
        className="w-full h-[760px] object-cover"
      />
    </div>
  );
}