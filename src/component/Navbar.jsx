import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-lg shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-blue-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Photobooth
        </h1>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-500 transition">
              Beranda
            </Link>
          </li>
          <li>
            <Link
              to={"/kebijakan-privasi"}
              className="hover:text-blue-500 transition"
            >
              kebijakan privasi
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-500 transition"
              onClick={handleScrollToFooter}
            >
              Kontak
            </Link>
          </li>
        </ul>

        {/* Tombol & Menu Mobile */}
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" px-6 py-3 bg-blue-500  hidden md:block  rounded-full text-white font-semibold border border-gray-300 hover:bg-blue-600 transition"
            onClick={() => navigate("/photobooth")}
          >
            Mulai Sekarang
          </motion.button>

          {/* Tombol Hamburger */}
          <button
            className="md:hidden text-gray-900 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white p-4 shadow-md"
        >
          <ul className="flex flex-col gap-3 text-gray-900">
            <li>
              <a href="/" className="block py-2 hover:text-blue-500">
                Beranda
              </a>
            </li>
            <li>
              <a
                href="kebijakan-privasi"
                className="block py-2 hover:text-blue-500"
              >
                kebijakan privasi
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleScrollToFooter();
                }}
                className="block py-2 hover:text-blue-500"
              >
                Kontak
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
