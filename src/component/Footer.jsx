import React from "react";
import { FaEnvelope, FaTiktok, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        {/* Copyright */}
        <div>
          <p className="text-gray-400">
            &copy; 2025 Photobooth. Semua Hak Dilindungi.
          </p>
          <p className="text-gray-500 text-sm mt-1">Photobooth by Uria Dutu</p>
        </div>

        {/* Sosial Media */}
        <div className="">
            <div className="text-center text-gray-200 mb-2 font-bold">Kontak</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="mailto:balisoan03@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition text-xl"
            >
              <FaEnvelope />
              <span className="text-sm">Uria Dutu</span>
            </a>
            <a
              href="https://www.tiktok.com/@uriadutu_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition text-xl"
            >
              <FaTiktok />
              <span className="text-sm">Uria Dutu</span>
            </a>
            <a
              href="https://github.com/Uriadutu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition text-xl"
            >
              <FaGithub />
              <span className="text-sm">Uria Dutu</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
