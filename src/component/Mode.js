import { useState } from "react";

export default function Mode() {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
      <button
        onClick={toggleMode}
        className="px-4 py-2 rounded shadow-md border"
      >
        {isLightMode ? "Mode Gelap" : "Mode Terang"}
      </button>
      
      <h1 className="text-3xl font-bold mt-6">Photobooth</h1>
      {/* Konten lainnya */}
    </div>
  );
}
