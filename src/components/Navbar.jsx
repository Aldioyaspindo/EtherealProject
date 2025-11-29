"use client";

import { useState } from "react";
// Asumsi Anda menggunakan Next.js Image dan Link, serta React Icons
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Kontainer Utama: Logo Kiri & Menu Kanan (didorong oleh justify-between) */}
        <div className="flex items-center justify-between w-full h-16">
          {/* 🔹 KIRI: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assetgambar/MainLogo.png"
                alt="Logo Ethereal"
                width={150}
                height={40}
                priority
                className="w-[150px] h-auto"
              />
            </Link>
          </div>

          {/* 🔹 KANAN: Menu Navigasi (Desktop), Ikon Keranjang, & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Navigasi Desktop */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-black text-base lg:text-xl font-medium font-['Poppins'] hover:text-[#001E91] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Ikon Keranjang */}
            <Link
              href="/keranjang"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaShoppingCart className="text-xl sm:text-2xl text-black" />
            </Link>

            {/* Tombol Hamburger (Mobile Only) */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl text-black" />
              ) : (
                <FaBars className="text-xl text-black" />
              )}
            </button>
          </div>
        </div>

        {/* 🔹 MOBILE MENU (Drawer) */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out z-40 p-6 md:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end mb-8">
            {/* Tombol Close di dalam mobile menu */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="text-xl text-black" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu} // Tutup menu setelah klik
                className="text-black text-2xl font-medium font-['Poppins'] py-2 border-b border-gray-100 hover:text-[#001E91]"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
