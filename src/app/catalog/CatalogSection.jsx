"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CatalogCards from "./CatalogCards";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const CatalogSection = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        console.log("Fetching from:", process.env.NEXT_PUBLIC_API_URL);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/catalogs`
        );

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        setCatalogs(data);
      } catch (error) {
        console.error("Gagal mendapatkan data Catalog:", error.message);
        setCatalogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 text-center">
        <p className="text-gray-600 text-lg">Memuat data Catalog...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className={`text-5xl font-semibold text-center text-black mb-16 ${poppins.className}`}
        >
          Catalog
        </h2>

        {catalogs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Belum ada catalog yang tersedia.
          </p>
        ) : (
          // === PERUBAHAN UTAMA DI SINI ===
          // Default: grid-cols-2 (Selalu 2 kolom, termasuk ponsel kecil)
          // md:grid-cols-3 (3 kolom untuk Tablet)
          // lg:grid-cols-4 (4 kolom untuk Laptop/PC)
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
            {catalogs.map((item, index) => (
              <CatalogCards key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
