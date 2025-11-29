"use client";
import {
  FaUser,
  FaFilePowerpoint,
  FaTshirt,
  FaThumbsUp,
  FaChevronLeft,
  FaBars,
  FaTimes,
  FaFileUpload,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("adminToken"); // ← FIX
    router.push("/loginadmin");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-neutral-900 text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>

      {/* Overlay - Only visible on mobile when menu is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-[300px] min-h-screen bg-neutral-900 flex flex-col justify-between py-10 px-8
          fixed md:relative z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* Logo */}
          <Link href="/admin">
            <img
              src="/assetgambar/LogoPutih.png"
              alt="Logo"
              className="w-56 h-10 mb-16"
            />
          </Link>

          {/* Menu */}
          <nav className="flex flex-col gap-6 text-white text-lg font-poppins">
            <Link
              href="/admin/user"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={closeMenu}
            >
              <RiAdminFill className="text-xl" />
              <span>User Admin</span>
            </Link>

            <Link
              href="/admin/userCustomer"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={closeMenu}
            >
              <FaUser className="text-xl" />
              <span>User Customer</span>
            </Link>

            <Link
              href="/admin/catalog"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={closeMenu}
            >
              <FaTshirt className="text-xl" />
              <span>Katalog</span>
            </Link>

            <Link
              href="/admin/portofolio"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={closeMenu}
            >
              <FaFileUpload className="text-xl" />
              <span>Portofolio</span>
            </Link>

            <Link
              href="/admin/article"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={closeMenu}
            >
              <FaFilePowerpoint className="text-xl" />
              <span>Artikel</span>
            </Link>

            <Link
              href="/admin/about"
              className="flex items-center gap-3 hover:text-blue-400 transition"
              onClick={closeMenu}
            >
              <FaThumbsUp className="text-xl" />
              <span>Feedback</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-[#011C83] text-white text-base font-poppins px-4 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <FaChevronLeft />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
