"use client";
import { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Cambiar manual el estado para ver navbar con usuario logeado
  const [isLogged, setIsLogged] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = "Usuario";

  return (
    <nav className="bg-primary text-secondary py-4">
      <div className="container mx-auto flex flex-wrap items-center px-4">
        <Link href="/home">
          <div className="flex items-center justify-start space-x-2 text-lg font-bold">
            <span className="text-secondary">FORGEFIT</span>
          </div>
        </Link>

        <div className="flex items-center justify-center space-x-4 mx-24">
          {!isLogged ? (
            <>
              <Link
                href="/login"
                className="hover:text-secondary2 text-secondary"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="hover:text-secondary2 text-secondary"
              >
                REGISTRATE
              </Link>
              <Link
                href="/contacto"
                className="hover:text-secondary2 text-secondary"
              >
                CONTACTO
              </Link>
              <Link
                href="/aboutUs"
                className="hover:text-secondary2 text-secondary"
              >
                SOBRE NOSOTROS
               </Link>
            </>
          ) : (
            <>
              <Link
                href="/activities"
                className="hover:text-secondary2 text-secondary"
              >
                CLASES
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="hover:text-secondary2 text-secondary"
                >
                  Hola, {userName} {isMenuOpen ? "▵" : "▿"}
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 bg-white text-black shadow-lg mt-2 rounded-md">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/agenda"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Mi Agenda
                    </Link>
                    <Link
                      href="/subscription"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Mi Suscripción
                    </Link>
                    <button
                      onClick={() => {
                        setIsLogged(false);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Barra buscadora  */}
          <div className="flex items-center space-x-2 ">
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
