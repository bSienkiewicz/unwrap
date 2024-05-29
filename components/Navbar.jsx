import React from 'react'
import { Salsa } from "next/font/google";
const salsa = Salsa({  weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <a href='/' className={`${salsa} p-2 md:p-4 text-center`}>unwrap</a>
  )
}

export default Navbar