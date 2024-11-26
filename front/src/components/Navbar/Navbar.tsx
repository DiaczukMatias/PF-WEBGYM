"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";
import styles from "./Navbar.module.css";
import Searchbar from "../SearchBar/SearchBar";


const Navbar = () => {
  const { data: session, status } = useSession();
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = session?.user?.name || "Usuario";
  const isLogged = status === "authenticated";

  const rolUsuario = session?.user?.rol;
  const esCliente = rolUsuario === "cliente" || undefined ;
  const esAdmin = rolUsuario === "admin";
  const esProfesor = rolUsuario === "profesor";

  if (status === "loading") {
    return (
      <nav className={`${styles.navbar} bg-primary text-secondary py-4`}>
        <div className="container mx-auto flex items-center justify-center">
          <FaSpinner className="animate-spin text-secondary" size={24} />
          <span className="ml-2 text-secondary">Cargando...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${styles.navbar} bg-primary text-secondary py-4`}>
      <div className="container mx-auto flex items-center px-2">
        <Link href="/home">
          <Image src="/Group.png" alt="Logo" width={120} height={100} />
        </Link>

        <div className="flex items-center space-x-4 mx-auto">
          {!isLogged ? (
            <>
              <Link
                href="/login"
                className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
              >
                INGRESAR
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
              {(esCliente || !rolUsuario || esAdmin) && (
                <Link
                  href="/planes"
                  className="text-secondary hover:text-[#b6ff04] transition-colors duration-300"
                >
                  PLANES
                </Link>
              )}
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
                  >
                    <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                      >
                      Mi Perfil
                      </Link>
                      {esAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                      >
                       DASHBOARD ADMINISTRADOR
                      </Link>
                    )}
                    
                     {(esCliente || esProfesor) && (
                    <Link
                      href="/agenda"
                      className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                    >
                      Mi Agenda
                    </Link>)}
                    {esCliente && (
                      <Link
                        href="/miMembresia"
                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#b6ff04]"
                      >
                        Mi Membresia
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut({ callbackUrl: "/home" });
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
          <Searchbar />
        </div>
        <div>
        <button
          className="flex justify-end items-end m-2 p-2 text-white"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

