import React from "react";

export default function QuantityControl({ quantity, setQuantity }) {
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1) setQuantity(num);
    else if (value === "") setQuantity("");
  };

  return (
    <div>
      <p className="text-zinc-600 text-lg mb-3">Jumlah</p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="px-4 py-2 bg-blue-900 rounded-lg text-lg font-bold hover:bg-blue-800"
        >
          −
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-20 text-center border text-black rounded-lg text-lg p-2"
        />
        <button
          onClick={handleIncrease}
          className="px-4 py-2 bg-blue-900 rounded-lg text-lg font-bold hover:bg-blue-800"
        >
          +
        </button>
      </div>
    </div>
  );
}
