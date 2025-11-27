"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import CatalogForm from "../CatalogForm";

export default function UpdateCatalogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/catalogs/${id}`
        );
        const data = res.data.data;
        setInitialData({
          productName: data.productName,
          productPrice: data.productPrice,
          productColor: data.productColor,
          productSize: data.productSize,
          productDescription: data.productDescription,
          productTotal: data.productTotal,
          productImageUrl: data.productImage,
          productImageFile: null,
        });
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data.");
        router.push("/admin/catalog");
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async (formData) => {
    setSubmitLoading(true);

    try {
      const fd = new FormData();
      fd.append("productName", formData.productName);
      fd.append("productPrice", formData.productPrice);
      fd.append("productColor", formData.productColor);
      fd.append("productSize", formData.productSize);
      fd.append("productDescription", formData.productDescription);
      fd.append("productTotal", formData.productTotal);

      if (formData.productImageFile) {
        fd.append("productImage", formData.productImageFile);
      }

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/catalogs/${id}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Catalog berhasil diupdate!");
      router.push("/admin/catalog");
    } catch (error) {
      console.error("Gagal update:", error);
      alert(error.response?.data?.message || "Update gagal.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        Memuat data catalog...
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        Data catalog tidak ditemukan.
      </div>
    );
  }

  return (
    <CatalogForm
      onSubmit={handleSubmit}
      initialData={initialData}
      loading={submitLoading}
      pageTitle="Update Catalog"
      buttonText="Update Catalog"
    />
  );
}