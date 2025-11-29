import React from "react";
import { getColorCode } from "./ColorHelper";

export default function ColorDisplay({ color }) {
  return (
    <div>
      <p className="text-zinc-600 text-lg mb-3">Warna</p>
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 border border-gray-400 rounded-full"
          style={{
            backgroundColor: getColorCode(color),
          }}
        ></div>
        <p className="font-medium text-2xl text-black">{color}</p>
      </div>
    </div>
  );
}
