"use client";
import { useState, useEffect } from "react";
import ClassCardList from "@/components/CardList/CardList";
import { profesoresData } from "@/helpers/datatemporalClases"; // Simulación local de clases
import { getCategories } from "@/helpers/Fetch/FetchCategorias"; // Fetch de categorías
import { searchClases } from "@/helpers/Fetch/FetchClases"; // Buscar clases con parámetros
import { fetchClases } from "@/helpers/Fetch/FetchClases"; // Obtener todas las clases
import { ICategoria } from "@/interfaces/ICategory";
import { ISearchResult } from "@/interfaces/ISearch";

const ClasesView = () => {
  // Estados para datos dinámicos
  const [categories, setCategories] = useState<ICategoria[]>([]); 
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  // Estados para filtros
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedProfesor, setSelectedProfesor] = useState<string[]>([]); // Cambié a un array para permitir múltiples profesores seleccionados
  const [showFilters, setShowFilters] = useState(false);

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log('error enn categories', error)
        setErrorCategories("Error al cargar las categorías.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Llamar a la API de clases cuando cambian los filtros o no hay filtros aplicados
  useEffect(() => {
    const fetchClassesData = async () => {
      setLoading(true);
      setError(null);

      // Si no hay filtros, obtener todas las clases
      if (selectedCategory.length === 0 && selectedProfesor.length === 0) {
        try {
          const data = await fetchClases(); // Llamamos a la API para obtener todas las clases
          setFilteredClasses(data);
        } catch (err) {
          console.error("Error al obtener todas las clases:", err);
          setError("Hubo un problema al cargar las clases.");
        }
      } else {
        // Si hay filtros, buscar clases con los filtros seleccionados
        try {
          const data = await searchClases({
            claseNombre: "", 
            categoriaNombre: selectedCategory.join(","),
            perfilProfesorNombre: selectedProfesor.join(","),
            descripcion: "",
          });
          if (data.length === 0) {
            setError("No se encontraron resultados para tu búsqueda.");
          } else {
            setFilteredClasses(data);
          }
        } catch (err) {
          console.error("Error al obtener resultados:", err);
          setError("Hubo un problema al cargar los resultados.");
        }
      }
      setLoading(false);
    };

    fetchClassesData();
  }, [selectedCategory, selectedProfesor]); // Dependencias para recargar la búsqueda cuando cambian los filtros

  // Función para manejar la selección de categorías
  const handleSelectCategory = (categoryId: string) => {
    const categoryName = categories.find((cat) => cat.id === categoryId)?.nombre;
    if (categoryName) {
      setSelectedCategory((prevState) =>
        prevState.includes(categoryName)
          ? prevState.filter((name) => name !== categoryName) // Filtramos el nombre
          : [...prevState, categoryName] // Agregamos el nombre
      );
    }
  };

  // Función para manejar la selección de profesores
  const handleSelectProfesor = (profesorId: string | null) => {
    if (profesorId === null) {
      setSelectedProfesor([]); // Limpiamos todos los profesores seleccionados
    } else {
      const profesorName = profesoresData.find((prof) => prof.id === profesorId)?.nombre;
      if (profesorName) {
        setSelectedProfesor((prevState) =>
          prevState.includes(profesorName)
            ? prevState.filter((name) => name !== profesorName) // Si el nombre ya está, lo eliminamos
            : [...prevState, profesorName] // Si no está, lo agregamos
        );
      }
    }
  };

  // Función para limpiar filtros
  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSelectedProfesor([]);
  };

  return (
    <div>
      {/* Botón para mostrar/ocultar filtros */}
      <div className="flex justify-start items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-accent px-4 py-2 rounded"
        >
          {showFilters ? "Ocultar Filtros" : "FILTRAR CLASES"}
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="flex flex-col md:flex-row justify-between my-4 gap-4">
          {/* Filtro por categorías */}
          <div className="flex flex-col">
            <h3 className="text-accent font-bold mb-2">Categorías</h3>
            {loadingCategories ? (
              <p>Cargando categorías...</p>
            ) : errorCategories ? (
              <p className="text-red-500">{errorCategories}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(category.nombre)} // Cambié category.id por category.nombre
                      onChange={() => handleSelectCategory(category.id)}
                      className="mr-2"
                    />
                    {category.nombre}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por profesores */}
          <div className="flex flex-col">
            <h3 className="text-accent font-bold mb-2">Profesores</h3>
            <div className="flex flex-wrap gap-2">
              {profesoresData.map((profesor) => (
                <label key={profesor.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProfesor.includes(profesor.nombre)} // Usamos array para permitir múltiples selecciones
                    onChange={() => handleSelectProfesor(profesor.id)} // Al hacer click, añadimos o eliminamos el profesor de la lista
                    className="mr-2"
                  />
                  {profesor.nombre}
                </label>
              ))}
            </div>
          </div>

          {/* Filtros seleccionados */}
          <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded">
            <h3 className="text-accent font-bold mb-2">Filtros seleccionados</h3>
            <div>
              {selectedCategory.length > 0 && (
                <p>
                  <strong>Categorías:</strong>{" "}
                  {selectedCategory
                    .map((name) => categories.find((cat) => cat.nombre === name)?.nombre) // Mapeamos los nombres correctamente
                    .join(", ")}
                </p>
              )}
              {selectedProfesor.length > 0 && (
                <p>
                  <strong>Profesores:</strong>{" "}
                  {selectedProfesor.join(", ")}
                </p>
              )}
            </div>
            <button
              onClick={handleClearFilters}
              className="text-white bg-red-500 py-1 px-3 rounded mt-4"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Listado de clases */}
      <h2 className="text-center font-bold text-xl text-accent my-4">
        Clases Disponibles
      </h2>

      {/* Mostramos las clases dependiendo de si hay filtros o no */}
      {loading ? (
        <p>Cargando clases...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ClassCardList classes={filteredClasses} />
      )}
    </div>
  );
};

export default ClasesView;


/* import ClassCardList from "@/components/CardList/CardList";
import Category from "@/components/Categories/Categories";
import { clasesData, categoriesData, profesoresData } from "@/helpers/datatemporalClases";
import Profesores from "@/components/Profesor/Profesor";


const ClasesView= () => {
    return (
      <div>
             <Category categories={categoriesData} />   
             <h2 className="flex justify-center font-bold font-sans text-xl text-accent m-4">CLASES:</h2>   
             <ClassCardList classes={clasesData} />
             <Profesores profesores={profesoresData} itemsPerPage={5}/>
         
      </div>
    );
  };
  
  export default ClasesView
  */