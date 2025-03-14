import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarCam = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-blue-500 cursor-pointer"
          onClick={() => {navigate("/"); window.location.reload();}}
        >
          Photobooth
        </h1>
      </div>
    </nav>
  );
};

export default NavbarCam;
