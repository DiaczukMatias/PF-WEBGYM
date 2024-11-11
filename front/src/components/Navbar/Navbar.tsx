"use client";
import { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = session?.user?.name || "Usuario";
  const isLogged = status === "authenticated";

  return (
    <nav className={`${styles.navbar} bg-primary text-secondary py-4`}>
      <div className="container mx-auto flex items-center px-2 ">
        <Link href="/home">
          <Image src="/Group.png" alt="Location" width={120} height={100} />
        </Link>

        <div className="flex items-center space-x-4 mx-auto">
          {!isLogged ? (
            <>
              <Link
                href="/profile"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                PERFIL
              </Link>
              <Link
                href="/planes"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                PLANES
              </Link>
              <Link
                href="/login"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                REGISTRATE
              </Link>
              <Link
                href="/contacto"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                CONTACTO
              </Link>
              <Link
                href="/aboutUs"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                SOBRE NOSOTROS
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/clases"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                CLASES
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
                >
                  Hola, {userName} {isMenuOpen ? "▵" : "▿"}
                </button>
                {isMenuOpen && (
                  <div
                    className="absolute right-0 bg-white bg-opacity-90 text-black shadow-lg mt-2 rounded-md transition-transform duration-500 ease-out transform origin-top"
                    style={{
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "scaleY(1)" : "scaleY(0)",
                    }}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/agenda"
                      className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                    >
                      Mi Agenda
                    </Link>
                    <Link
                      href="/subscription"
                      className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                    >
                      Mi Suscripción
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false); // Cerramos el menú desplegable
                        signOut({ callbackUrl: "/home" }); // Llamamos a la función de cierre de sesión
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Barra buscadora */}
          <div className={`flex items-center space-x-2`}>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isSearchOpen ? "w-48 opacity-100 ml-2" : "w-0 opacity-0"
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 bg-black text-secondary border border-accent rounded-md focus:outline-none focus:border-accent2 w-full transition-transform duration-300 transform"
                style={{
                  transform: isSearchOpen
                    ? "translateX(0)"
                    : "translateX(100%)",
                }}
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-accent hover:text-secondary2"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
