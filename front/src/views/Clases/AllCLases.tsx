"use client";
import { usePathname } from "next/navigation"; // Importa el hook
import { useState, useEffect } from "react";
import ClassCardList from "@/components/CardList/CardList";
import { getCategories } from "@/helpers/Fetch/FetchCategorias"; // Fetch de categorías
import { searchClases } from "@/helpers/Fetch/FetchClases"; // Buscar clases con parámetros
import { fetchTodasClases } from "@/helpers/Fetch/FetchClases"; // Obtener todas las clases
import { ICategoria } from "@/interfaces/ICategory";
import { ISearchResult } from "@/interfaces/ISearch";
import { IProfesor } from "@/interfaces/IProfesor";
import { useSession } from "next-auth/react";

const AllClasesView = () => {
  const pathname = usePathname(); // Obtén la ruta actual
  const isAdminRoute = pathname === "/admin/clases"; // Detecta si es admin

  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<ISearchResult[]>([]);
  const [professorsInFilteredClases, setProfessorsInFilteredClases] = useState<IProfesor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProfesor, setSelectedProfesor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [page] = useState<number> (1);  // Estado para la página
  const [limit] = useState<number> (10);  // Estado para el límite de clases por página
  const { data: session } = useSession();


  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!session?.user.accessToken) {
          console.error('El token de acceso no está disponible.');
          return; // Detener la ejecución
        }
        setLoadingCategories(true);
        const data = await getCategories(session?.user.accessToken);
        setCategories(data);
      } catch (error) {
        console.error(error)
        setErrorCategories("Hubo un problema al cargar las categorías. Intenta más tarde.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch classes data
  useEffect(() => {
    const fetchClassesData = async () => {

      setLoading(true);
      setError(null);

      try {
        let data: ISearchResult[];
        
        if (!session?.user.accessToken) {
          console.error('El token de acceso no está disponible.');
          setLoading(false);
          return; // Detener la ejecución
        }
        if (!selectedCategory && !selectedProfesor) {
          data = await fetchTodasClases( page, limit, session.user.accessToken);
          
        } else {
          data = await searchClases({
            claseNombre: "",
            categoriaNombre: selectedCategory || "",
            perfilProfesorNombre: selectedProfesor || "",
            descripcion: "",
          });
        }

        if (data.length === 0) {
          setFilteredClasses([]);
          setProfessorsInFilteredClases([]);
          setError("No se encontraron clases con los parámetros dados.");
        } else {
          setFilteredClasses(data);
          const professors = data
            .map((clase) => clase.perfilProfesor)
            .filter((profesor) => profesor !== null);
          setProfessorsInFilteredClases(professors as IProfesor[]);
        }
      } catch (err) {
        console.error(err)
        setError("Hubo un problema al cargar las clases. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassesData();
  }, [selectedCategory, selectedProfesor, page, limit]);

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedProfesor(null);
  };

  return (
    <div>
      <div className="flex justify-start items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-accent bg-primary px-4 py-2 rounded hover:bg-accent2 transition-colors"
        >
          {showFilters ? "Ocultar Filtros" : "FILTRAR CLASES"}
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-col md:flex-row justify-between my-4 gap-4">
          {/* Dropdown para Categorías */}
          <div className="flex flex-col">
            <h3 className="text-accent font-bold mb-2">Categorías</h3>
            {loadingCategories ? (
              <p>Cargando categorías...</p>
            ) : errorCategories ? (
              <p className="text-red-500">{errorCategories}</p>
            ) : (
              <select
                value={selectedCategory || ""}
                onChange={(e) => {
                  setSelectedCategory(e.target.value || null);
                  setSelectedProfesor(null);
                }}
                className="select-custom mt-1 p-2 w-full border-2 border-lime-400 rounded-md bg-gray-800 text-white hover:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-50"
              >
                <option value="" className="bg-gray-700 text-gray-400">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" key={category.id} value={category.nombre}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Dropdown para Profesores */}
          {selectedCategory && professorsInFilteredClases.length > 0 && (
            <div className="flex flex-col">
              <h3 className="text-accent font-bold mb-2">Profesores</h3>
              <select
                value={selectedProfesor || ""}
                onChange={(e) => setSelectedProfesor(e.target.value || null)}
                className="select-custom mt-1 p-2 w-full border-2 border-lime-400 rounded-md bg-gray-800 text-white hover:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-50"
              >
                <option value="" className="bg-gray-700 text-gray-400">Selecciona un profesor</option>
                {professorsInFilteredClases
                  .filter((profesor) => profesor?.id)
                  .reduce((unique, profesor) => {
                    if (!unique.some((p) => p.id === profesor.id)) {
                      unique.push(profesor);
                    }
                    return unique;
                  }, [] as IProfesor[])
                  .map((profesor) => (
                    <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" key={profesor.id} value={profesor.nombre}>
                      {profesor.nombre}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Filtros seleccionados */}
          <div className="w-full md:w-1/3 text-primary p-4 rounded shadow-md">
            <h3 className="text-accent font-bold mb-2">Filtros seleccionados</h3>
            <div>
              {selectedCategory && (
                <p>
                  <strong>Categoría:</strong> {selectedCategory}
                </p>
              )}
              {selectedProfesor && (
                <p>
                  <strong>Profesor:</strong> {selectedProfesor}
                </p>
              )}
            </div>
            <button
              onClick={handleClearFilters}
              className="text-secondary bg-red-500 py-1 px-3 rounded mt-4 hover:bg-red-600 transition"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      <h2 className="text-center font-bold text-2xl text-accent my-4">
        Clases Disponibles
      </h2>

      {loading ? (
        <p className="text-white">Cargando clases...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredClasses.length === 0 ? (
        <p className="text-secondary2">No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <ClassCardList classes={filteredClasses} />
      )}

       {/* Botones adicionales para admin */}
       {isAdminRoute && (
        <div className="flex justify-center items-center m-4 gap-6">
          <button
            className="submitButton .submitButton:hover"
            onClick={() => window.location.href = `/crearClase`}
          >
            Crear Clase
          </button>
        </div>
      )}
    </div>
  );
};


export default AllClasesView;

