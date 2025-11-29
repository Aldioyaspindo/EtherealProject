"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CatalogForm from "../CatalogForm";
import toast from "react-hot-toast";

export default function CreateCatalogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productPrice", formData.productPrice);
      formDataToSend.append("productColor", formData.productColor);
      formDataToSend.append("productSize", formData.productSize);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("productTotal", formData.productTotal);

      if (formData.productImageFile) {
        formDataToSend.append("productImage", formData.productImageFile);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/catalogs`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response:", response.data);
      toast.success("Berhasil Menambahkan Data ke Katalog", {
        duration: 3000,
        position: "bottom-center",
        style: {
          background: "#ffffff",
          color: "black",
          padding: "12px 24px",
          borderRadius: "999px",
          fontSize: "14px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        },
      });
      router.push("/admin/catalog");
    } catch (error) {
      console.error("Upload gagal:", error);
      toast.error(
        "Gagal menambahkan catalog: " +
          (error.response?.data?.message || error.message),
        {
          duration: 4000,
          position: "bottom-center",
          style: {
            background: "#ffffff",
            color: "black",
            padding: "16px 20px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(245, 87, 108, 0.4)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            minWidth: "320px",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CatalogForm
      onSubmit={handleSubmit}
      initialData={null}
      loading={loading}
      pageTitle="Tambah Catalog"
      buttonText="Simpan Catalog"
    />
  );
}
