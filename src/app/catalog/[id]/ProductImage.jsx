import React from "react";
import Image from "next/image";

export default function ProductImage({ imageUrl, productName }) {
  if (!imageUrl) return null;

  return (
    <div className="w-full h-[760px] bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
      <Image src={imageUrl} alt={productName} fill className="object-cover" />
    </div>
  );
}
