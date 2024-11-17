"use client";

import { searchClases } from "@/helpers/Fetch/FetchClases";
import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Usar el hook de navegación

const Searchbar = () => {
  const [query, setQuery] = useState(""); // Entrada del usuario
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Estado de apertura de la barra
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores
  const router = useRouter(); // Hook de navegación de Next.js

  const handleSearch = async () => {
    if (!query.trim()) return; // Evita buscar si el input está vacío

    setLoading(true);
    setError("");
    try {
        const data = await searchClases({ 
            claseNombre: query,
            categoriaNombre: query,
            perfilProfesorNombre: query,
            descripcion: query
        });

        if (data.length === 0) {
            setError("No se encontraron resultados para tu búsqueda.");
        } else {
            // Redirigir a la página de resultados con la query como parámetro
            router.push(`/search-results?query=${encodeURIComponent(query)}`);
        }
    } catch (err) {
        console.error("Error en la búsqueda:", err);
        setError("Hubo un problema al realizar la búsqueda. Intenta nuevamente.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className={`flex items-center space-x-2`}>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isSearchOpen ? "w-48 opacity-100 ml-2" : "w-0 opacity-0"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 bg-black text-secondary border border-accent rounded-md focus:outline-none focus:border-accent2 w-full transition-transform duration-300 transform"
          style={{
            transform: isSearchOpen ? "translateX(0)" : "translateX(100%)",
          }}
        />
      </div>
      <button
        onClick={() => {
          if (isSearchOpen && query.trim()) {
            handleSearch(); // Ejecuta la búsqueda si la barra está abierta y hay texto
          }
          setIsSearchOpen(!isSearchOpen); // Alterna el estado de la barra
        }}
        className="text-accent hover:text-secondary2"
      >
        {loading ? (
          <FaSpinner className="animate-spin" size={20} />
        ) : (
          <FaSearch size={20} />
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Searchbar;
