import React from "react";
import Image from "next/image";

export default function ProductImage({ imageUrl, productName }) {
  if (!imageUrl) return null;

  return (
    <div className="w-full h-[760px] bg-gray-100 rounded-xl overflow-hidden shadow-md">
      <Image
        src={imageUrl}
        alt={productName}
        width={500}
        height={500}
        className="w-full h-[760px] object-cover"
      />
    </div>
  );
}