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
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-white text-gray-900 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden">
      {/* Oval Blur Background */}
      <div className="absolute w-[300px] h-[200px] bg-blue-300 opacity-30 blur-3xl rounded-full top-5 left-5 md:w-[400px] md:h-[250px] md:left-32"></div>
      <div className="absolute w-[350px] h-[220px] bg-purple-300 opacity-30 blur-3xl rounded-full bottom-5 right-5 md:w-[500px] md:h-[300px] md:right-32"></div>

      {/* Bagian Teks */}
      <div className="pt-16 md:pt-0 w-full">
        <div className="w-full text-center md:text-left z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 leading-tight">
            Abadikan Momen Terbaik di{" "}
            <span className="text-blue-500">Photobooth</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-5">
            Ambil foto, atur tata letak, dan unduh dengan mudah. Jadikan setiap
            momen lebih spesial.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:justify-center md:justify-start">
            {/* Tombol */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium rounded-md shadow-md hover:bg-blue-600 transition"
              onClick={() => navigate("/photobooth")}
            >
              Mulai Sekarang
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-medium border border-gray-700 rounded-md shadow-md hover:bg-gray-100 transition"
              onClick={handleScrollToFooter}
            >
              Kontak
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="w-full flex justify-center mt-6 md:mt-0 z-10">
        <img
          src={foto}
          alt="photobooth"
          className="w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
      </div>
    </div>
  );
};

export default Home;
