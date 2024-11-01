"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white-200 py-4 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 text-lg font-bold">
            <span className="flex items-center text-white">NOMBREDELGYM</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <>
            <a href="/login" className="hover:text-gray-400 text-white">
              Sign In
            </a>
            <a href="/register" className="hover:text-gray-400 text-white">
              Sign Up
            </a>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
