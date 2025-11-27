// File: CreatePortofolioPage.jsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PortofolioForm from "../portofolioForm";// PERUBAHAN: Ganti import ke PortofolioForm
import toast from "react-hot-toast";

// PERUBAHAN: Ganti nama fungsi komponen menjadi CreatePortofolioPage
export default function CreatePortofolioPage() { 
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // PERUBAHAN: Sesuaikan logika handleSubmit untuk data Portofolio (keterangan, gambarFile)
  const handleSubmit = async (formData) => {
  setLoading(true);

  try {
    const formDataToSend = new FormData();
    
    formDataToSend.append("keterangan", formData.keterangan);
    
    if (formData.gambarFile) {
      formDataToSend.append("gambar", formData.gambarFile);
    }
    
    // ✅ Debug: Lihat isi FormData
    console.log("📦 FormData contents:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/portofolio`,
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Response:", response.data);
    toast.success("Berhasil Menambahkan Data ke Portofolio");
    router.push("/admin/portofolio");
    
  } catch (error) {
    console.error("❌ Upload gagal:", error);
    console.error("❌ Error response:", error.response?.data);
    toast.error(
      "Gagal menambahkan portofolio: " +
        (error.response?.data?.message || error.message)
    );
  } finally {
    setLoading(false);
  }
};

  return (
    // PERUBAHAN: Ganti komponen yang dirender menjadi PortofolioForm
    <PortofolioForm 
      onSubmit={handleSubmit}
      initialData={null}
      loading={loading}
      pageTitle="Tambah Portofolio Baru" // Sesuaikan judul
      buttonText="Simpan Portofolio"    // Sesuaikan teks tombol
    />
  );
}