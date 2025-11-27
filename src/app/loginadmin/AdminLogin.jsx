"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        { username, password },
        { withCredentials: true }
      );

      // Redirect setelah 1 detik
      router.push("/admin");

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login gagal. Periksa username dan password."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col md:flex-row w-full h-screen">
      {/* =============================== */}
      {/* KIRI: FORM LOGIN */}
      {/* =============================== */}
      <div className="flex-1 flex items-center justify-center p-10 bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10"
        >
          <h1 className="text-3xl font-semibold font-['Poppins'] text-center mb-10 text-gray-800">
            Admin Panel
          </h1>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-medium mb-2 font-['Poppins']">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-[40px] text-lg text-gray-800 placeholder-neutral-400 focus:ring-2 focus:ring-blue-900/40 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-lg text-gray-700 font-medium mb-2 font-['Poppins']">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-[40px] text-lg text-gray-800 placeholder-neutral-400 focus:ring-2 focus:ring-blue-900/40 focus:outline-none"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-center text-sm mb-4 font-['Poppins']">
              {error}
            </p>
          )}

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white text-lg font-bold rounded-[40px] shadow-md transition font-['Poppins'] disabled:opacity-60"
          >
            {loading ? "Loading..." : "LOGIN"}
          </button>
        </form>
      </div>

      {/* =============================== */}
      {/* KANAN: GAMBAR + LOGO */}
      {/* =============================== */}
      <div className="flex-1 relative">
        <Image
          src="/assetgambar/imagelogin.jpg"
          alt="Background"
          fill
          className="object-cover blur-sm brightness-90"
          priority
        />

        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assetgambar/MainLogo.png"
            alt="Logo"
            width={400}
            height={400}
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
