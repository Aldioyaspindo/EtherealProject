"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function CatalogForm({
  onSubmit,
  initialData,
  loading,
  pageTitle,
  buttonText,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productColor: "",
    productSize: "",
    productDescription: "",
    productTotal: "",
    productImageFile: null,
    productImageUrl: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        productName: initialData.productName || "",
        productPrice: initialData.productPrice || "",
        productColor: initialData.productColor || "",
        productSize: initialData.productSize || "",
        productDescription: initialData.productDescription || "",
        productTotal: initialData.productTotal || "",
        productImageFile: null,
        productImageUrl: initialData.productImageUrl || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    let newPreviewUrl = null;

    if (formData.productImageFile) {
      newPreviewUrl = URL.createObjectURL(formData.productImageFile);
    } else if (formData.productImageUrl) {
      newPreviewUrl = formData.productImageUrl;
    }

    setPreviewUrl(newPreviewUrl);

    return () => {
      if (newPreviewUrl && formData.productImageFile) {
        URL.revokeObjectURL(newPreviewUrl);
      }
    };
  }, [formData.productImageFile, formData.productImageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        productImageFile: file,
        productImageUrl: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-[1171px] mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-black mb-6">{pageTitle}</h1>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <label className="block mb-2 font-medium text-black">Nama Produk</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="border w-full p-3 mb-4 rounded text-black"
          />

          {/* Product Price */}
          <label className="block mb-2 font-medium text-black">Harga Produk</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
            min="0"
            className="border w-full p-3 mb-4 rounded text-black"
          />

          {/* Product Color */}
          <label className="block mb-2 font-medium text-black">Warna Produk</label>
          <input
            type="text"
            name="productColor"
            value={formData.productColor}
            onChange={handleChange}
            required
            className="border w-full p-3 mb-4 rounded text-black"
          />

          {/* Product Size */}
          <label className="block mb-2 font-medium text-black">Ukuran Produk</label>
          <input
            type="text"
            name="productSize"
            value={formData.productSize}
            onChange={handleChange}
            required
            className="border w-full p-3 mb-4 rounded text-black"
          />

          {/* Product Total */}
          <label className="block mb-2 font-medium text-black">Total Product</label>
          <input
            type="number"
            name="productTotal"
            value={formData.productTotal}
            onChange={handleChange}
            required
            min="0"
            className="border w-full p-3 mb-4 rounded text-black"
          />

          {/* Product Description */}
          <label className="block mb-2 font-medium text-black">Deskripsi Produk</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            required
            rows="4"
            className="border w-full p-3 mb-4 rounded text-black"
          />

          {/* Upload Gambar dari Lokal */}
          <div className="mb-6">
            <label
              htmlFor="productImageFile"
              className="block font-medium mb-2 text-black"
            >
              Upload Gambar Produk
            </label>
            <input
              type="file"
              id="productImageFile"
              name="productImageFile"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="w-full text-black border p-3 rounded-lg"
              // 'value' tidak diset untuk input file karena alasan keamanan
            />
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-black mb-2">Preview Gambar:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-48 h-48 object-cover text-black rounded-lg border border-neutral-300"
                />
              </div>
            )}
          </div>
          
          {/* Tombol */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {loading ? "Menyimpan..." : buttonText}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}