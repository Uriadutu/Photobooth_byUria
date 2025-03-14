import React from 'react'
import NavbarCam from '../component/NavbarCam';
import Footer from '../component/Footer';

const LayoutCam = ({ children }) => {
    return (
      <div className="relative">
        <NavbarCam />
        <main className=" mx-auto">
          {children}
        </main>
        <Footer/>
      </div>
    );
  };
  
  export default LayoutCam;
  