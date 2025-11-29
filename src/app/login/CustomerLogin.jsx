"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CustomerLogin() {
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
      const data = await login(username, password);
      toast.success("Selamat Login Berhasil");

      // Redirect setelah 1 detik
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
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
      <div className="flex-1 flex items-center justify-center p-10 bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10"
        >
          <h1 className="text-3xl font-semibold font-['Poppins'] text-center mb-10 text-gray-800">
            Login
          </h1>

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

          {error && (
            <p className="text-red-600 text-center text-sm mb-4 font-['Poppins']">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white text-lg font-bold rounded-[40px] shadow-md transition font-['Poppins'] disabled:opacity-60"
          >
            {loading ? "Loading..." : "LOGIN"}
          </button>

          <div className="text-center mt-2">
            <span className="text-gray-400">belum punya akun </span>
            <Link href="/register">
              <span className="text-blue-400 hover:text-blue-700">Register disini!</span>
            </Link>
          </div>
        </form>
      </div>

      <div className="flex-1 relative">
        <Image
          src="/assetgambar/imagelogin.webp"
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
