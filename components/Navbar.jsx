import React from "react";
import { Salsa } from "next/font/google";
const salsa = Salsa({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

const Navbar = () => {
  return (
    <div className="relative box-content flex items-center justify-center">
      <a href="/" className={`${salsa.className} p-2 md:p-4 text-center text-3xl`}>
        unwrapp
      </a>
      <div className="absolute top-0 -translate-y-1/2 left-0 right-0 mx-auto w-96 h-96 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Navbar;
