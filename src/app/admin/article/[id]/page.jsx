"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import ArticleForm from "../ArticleForm";

export default function UpdateArticlePage() {
  const router = useRouter();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!id) return; 

    const fetchArticle = async () => {
      setPageLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`
        );
        const data = res.data.data;
        setInitialData(data);

      } catch (err) {
        console.error("Gagal mengambil data:", err);
        alert("Gagal mengambil data artikel.");
        router.push("/admin/article"); 
      } finally {
        setPageLoading(false);
      }
    };

    fetchArticle();
  }, [id, router]); 

  const handleSubmit = async (formData) => {
    setSubmitLoading(true); 
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
        formData
      );

      if (response.status === 200) {
        alert("Artikel berhasil diupdate!");
        router.push("/admin/article");
      }
    } catch (error) {
      console.error("Error lengkap:", error);
      if (error.response) {
        alert(
          `Error ${error.response.status}: ${
            error.response.data?.message || "Gagal mengubah artikel"
          }`
        );
      } else if (error.request) {
        alert("Tidak dapat terhubung ke server.");
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setSubmitLoading(false); 
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        Loading data artikel...
      </div>
    );
  }

  if (!initialData) {
     return (
      <div className="flex justify-center items-center min-h-screen text-black">
        Data artikel tidak ditemukan.
      </div>
    );
  }

  return (
     <ArticleForm
      onSubmit={handleSubmit}
      initialData={initialData}
      loading={submitLoading}
      pageTitle="UPDATE ARTIKEL"
      buttonText="Update Artikel"
    />
  );
}