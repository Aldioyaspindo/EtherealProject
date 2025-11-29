"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import CatalogForm from "../CatalogForm";
import toast from "react-hot-toast";

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
        toast.error("Gagal memuat data.", {
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
        });
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

      toast.success("Catalog berhasil diupdate!", {
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
      console.error("Gagal update:", error);
      toast.error("Update gagal.", {
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
      });
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
