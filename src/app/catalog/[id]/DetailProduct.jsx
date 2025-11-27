"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import { fetchCatalogById } from "./api";
import { getOrCreateSessionId } from "./session";

export default function DetailProduct() {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sessionId, setSessionId] = useState(null);

  const params = useParams();

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const data = await fetchCatalogById(params.id);
        setCatalog(data);
      } catch (error) {
        console.error("Gagal mengambil data catalog:", error);
        setCatalog(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadCatalog();
  }, [params.id]);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 text-center">
        <p className="text-gray-600 text-lg">Memuat data produk...</p>
      </section>
    );
  }

  if (!catalog) {
    return (
      <section className="w-full py-20 text-center">
        <p className="text-gray-600 text-lg">Produk tidak ditemukan.</p>
      </section>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white py-10 px-6 sm:px-10 lg:px-24 font-[Poppins]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <ProductImage 
          imageUrl={catalog.productImage}
          productName={catalog.productName}
        />
        
        <ProductInfo
          catalog={catalog}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          sessionId={sessionId}
        />
      </div>

      <ProductDescription description={catalog.productDescription} />
    </div>
  );
}