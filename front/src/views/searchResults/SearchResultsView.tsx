"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchClases } from "@/helpers/Fetch/FetchClases";
import { FaSpinner } from "react-icons/fa";

const SearchResultsView: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // Extraer la query de la URL
  const [results, setResults] = useState<any>({
    clases: [],
    categorias: [],
    profesores: [],
  }); // Resultados categorizados
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

        if (!data) {
          setError("No se encontraron resultados para tu búsqueda.");
        } else {
          // Supongamos que `data` retorna una estructura que categoriza los resultados
          setResults({
            clases: data.clases || [],
            categorias: data.categorias || [],
            profesores: data.profesores || [],
          });
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

      {/* Sección de Clases */}
      {results.clases.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">Clases</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.clases.map((result) => (
              <li
                key={result.id}
                className="p-4 bg-white border rounded shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-accent">{result.nombre}</h3>
                <p className="text-gray-700">{result.descripcion}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sección de Categorías */}
      {results.categorias.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-primary mb-2">Categorías</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.categorias.map((categoria) => (
              <li
                key={categoria.id}
                className="p-4 bg-white border rounded shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-accent">{categoria.nombre}</h3>
                <p className="text-gray-700">{categoria.descripcion}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sección de Profesores */}
      {results.profesores.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-primary mb-2">Profesores</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.profesores.map((profesor) => (
              <li
                key={profesor.id}
                className="p-4 bg-white border rounded shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-accent">{profesor.nombre}</h3>
                <p className="text-gray-700">{profesor.descripcion}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default SearchResultsView;
