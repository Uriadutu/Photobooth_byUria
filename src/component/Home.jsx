import React from "react";
import foto from "../img/img.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
   const handleScrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="relative mt-0 pt-0 flex flex-col md:flex-row items-center justify-center min-h-screen bg-white text-gray-900 px-6 md:px-16 overflow-hidden">
      {/* Oval Blur Background */}
      <div className="absolute w-[500px] h-[300px] bg-blue-300 opacity-30 blur-3xl rounded-full top-10 left-10 md:left-32"></div>
      <div className="absolute w-[600px] h-[350px] bg-purple-300 opacity-30 blur-3xl rounded-full bottom-10 right-10 md:right-32"></div>

      {/* Bagian Teks (Kiri) */}
      <div className="w-full md:w-1/2 text-center md:text-left z-10 ">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight hover:scale-105 transition duration-300">
          Abadikan Momen Terbaikmu di{" "}
          <span className="text-blue-500">Photobooth</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 hover:scale-105 transition duration-300">
          Tangkap foto, buat kolase, dan unduh dalam kualitas terbaik.
          Mengabadikan setiap momen dan menjadikannya lebih spesial.
        </p>

        <div className="flex gap-4 items-center">
          {/* Tombol */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" px-6 py-3 bg-blue-500 text-white font-semibold border border-gray-300 hover:bg-blue-600 transition"
            onClick={() => navigate("/photobooth")}
          >
            Mulai Sekarang
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" px-6 py-3 bg-white text-gray-700 font-semibold border border-gray-700 hover:bg-gray-100 transition duration-300"
            onClick={handleScrollToFooter}
            
          >
            Kontak
          </motion.button>
        </div>
      </div>

      {/* Bagian Gambar (Kanan) */}
      <div className="w-full md:w-1/2 flex justify-center z-10 hover:scale-105 transition duration-300">
        <img
          src={foto}
          alt="photobooth"
          className="w-full max-w-2xl md:max-w-xl"
        />
      </div>
    </div>
  );
};

export default Home;
