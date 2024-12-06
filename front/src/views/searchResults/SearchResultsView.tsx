"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchClases } from "@/helpers/Fetch/FetchClases";
import { FaSpinner } from "react-icons/fa";
import { IClase } from "@/interfaces/IClase";
import ClassCardList from "@/components/CardList/CardList";

const SearchResultsView: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // Extraer la query de la URL
  const [results, setResults] = useState<IClase[]>([]); // Resultados
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;

      setLoading(true);
      setError("");
      try {
        const data = await searchClases({
          claseNombre: query,
          categoriaNombre: query,
          perfilProfesorNombre: query,
          descripcion: query,
        });

        if (data.length === 0) {
          setError("No se encontraron resultados para tu búsqueda.");
        } else {
          setResults(data);
        }
      } catch (err) {
        console.error("Error al obtener resultados:", err);
        setError("Hubo un problema al cargar los resultados.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Ejecutar cada vez que cambie la query

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-primary" size={30} />
        <span className="ml-2 text-secondary">Cargando resultados...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Resultados para `{query}`
      </h1>
      <ClassCardList classes={results} /> {/* Aquí se pasa el array de clases */}
    </div>
  );
}

export default SearchResultsView;
