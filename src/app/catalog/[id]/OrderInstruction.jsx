import React from "react";

export default function OrderInstructions() {
  return (
    <div>
      <p className="text-zinc-600 text-lg mb-2">Cara Pesan</p>
      <div className="bg-gray-100 rounded-lg p-4 text-gray-700 leading-relaxed">
        <ul>
          <li>1. Pilih produk yang anda inginkan</li>
          <li>2. Isi detail pemesanan</li>
          <li>3. Tekan tombol pesan di bawah</li>
          <li>4. Pemesanan akan dilakukan melalui WhatsApp</li>
          <li>5. Tunggu tanggapan admin</li>
        </ul>
      </div>
    </div>
  );
}
