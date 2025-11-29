import React from "react";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import ColorDisplay from "./ColorsDisplay";
import SizeSelector from "./SizeSelector";
import QuantityControl from "./QuantityControl";
import OrderInstructions from "./OrderInstruction";
import { handleAddToCart, handleOrderWhatsApp } from "./OrderHandlers";

export default function ProductInfo({
  catalog,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  sessionId,
}) {
  const onAddToCart = () => {
    handleAddToCart({
      selectedSize,
      sessionId,
      catalog,
      quantity,
    });
  };

  const onOrderWhatsApp = () => {
    handleOrderWhatsApp({
      selectedSize,
      catalog,
      quantity,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
        {catalog.productName}
      </h1>

      <ColorDisplay color={catalog.productColor} />

      <SizeSelector
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <OrderInstructions />

      <div className="flex items-center gap-2">
        <p className="text-2xl text-blue-900 font-medium">Rp</p>
        <p className="text-blue-900 text-3xl md:text-5xl font-medium">
          {catalog.productPrice?.toLocaleString("id-ID")}
        </p>
      </div>

      <QuantityControl quantity={quantity} setQuantity={setQuantity} />

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <button
          onClick={onOrderWhatsApp}
          className="flex items-center justify-center gap-2 w-full sm:w-auto flex-1 px-6 py-4 bg-blue-900 text-white text-xl rounded-lg hover:bg-blue-800 transition"
        >
          <span>Pesan Sekarang</span>
          <FaWhatsapp className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
