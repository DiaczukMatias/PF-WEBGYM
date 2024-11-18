"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Usar el hook de navegación

const Searchbar = () => {
  const [query, setQuery] = useState(""); // Entrada del usuario
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Estado de apertura de la barra
  const router = useRouter(); // Hook de navegación de Next.js

  const handleSearch = () => {
    if (query.trim()) {
      // Redirige a la página de resultados con la query como parámetro
      router.push(`/search-results?query=${encodeURIComponent(query)}`);
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
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="px-3 py-2 bg-black text-secondary border border-accent rounded-md focus:outline-none focus:border-accent2 w-full transition-transform duration-300 transform"
          style={{
            transform: isSearchOpen ? "translateX(0)" : "translateX(100%)",
          }}
        />
      </div>
      <button
        onClick={() => {
          if (isSearchOpen && query.trim()) {
            handleSearch();
          }
          setIsSearchOpen(!isSearchOpen); // Alterna el estado de la barra
        }}
        className="text-accent hover:text-secondary2"
      >
        <FaSearch size={20} />
      </button>
    </div>
  );
};

export default Searchbar;
