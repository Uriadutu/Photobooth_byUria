import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Navbar />
      <main className="pt-2 px-4 sm:px-6 md:px-12 lg:px-20 mx-auto">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
