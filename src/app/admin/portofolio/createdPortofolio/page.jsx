// File: CreatePortofolioPage.jsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PortofolioForm from "../portofolioForm";
import toast from "react-hot-toast";

export default function CreatePortofolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("keterangan", formData.keterangan);
      if (formData.gambarFile) {
        formDataToSend.append("gambar", formData.gambarFile);
      } // ✅ Debug: Lihat isi FormData
      console.log("📦 FormData contents:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/portofolio`,
        formDataToSend,
        {
          // ❌ HAPUS: Hapus seluruh objek 'headers' ini. Axios akan menanganinya
          // headers: { "Content-Type": "multipart/form-data" },
          // Tambahkan withCredentials jika Anda memerlukannya untuk cookies/JWT
          withCredentials: true,
        }
      );

      console.log("✅ Response:", response.data);
      toast.success("Berhasil Menambahkan Data ke Portofolio");
      router.push("/admin/portofolio");
    } catch (error) {
      console.error("❌ Upload gagal:", error); // Log error response di browser console
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
    <PortofolioForm
      onSubmit={handleSubmit}
      initialData={null}
      loading={loading}
      pageTitle="Tambah Portofolio Baru"
      buttonText="Simpan Portofolio"
    />
  );
}
