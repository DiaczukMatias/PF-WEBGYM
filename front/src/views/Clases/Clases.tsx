"use client";
import { useState, useEffect } from "react";
import ClassCardList from "@/components/CardList/CardList";
import { getCategories } from "@/helpers/Fetch/FetchCategorias"; // Fetch de categorías
import { searchClases } from "@/helpers/Fetch/FetchClases"; // Buscar clases con parámetros
import { fetchClases } from "@/helpers/Fetch/FetchClases"; // Obtener todas las clases
import { ICategoria } from "@/interfaces/ICategory";
import { ISearchResult } from "@/interfaces/ISearch";
import { IProfesor } from "@/interfaces/IProfesor";

const ClasesView = () => {
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<ISearchResult[]>([]);
  const [professorsInFilteredClases, setProfessorsInFilteredClases] = useState<IProfesor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProfesor, setSelectedProfesor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  console.log('categories: ', categories);
  console.log('errorCategories: ', errorCategories);
  console.log('filteredClasses: ', filteredClasses);
  console.log('professorsInFilteredClases: ', professorsInFilteredClases);
  console.log('error: ', error);
  console.log('selectedProfesor: ', selectedProfesor);
  console.log('selectedCategory: ', selectedCategory);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setErrorCategories("Error al cargar las categorías.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchClassesData = async () => {
      setLoading(true);
      setError(null);

      try {
        let data: ISearchResult[];

        if (!selectedCategory && !selectedProfesor) {
          data = await fetchClases();
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
          setError("No se encontraron resultados para tu búsqueda.");
        } else {
          setFilteredClasses(data);

          const professors = data
            .map((clase) => clase.perfilProfesor)
            .filter((profesor) => profesor !== null); // Asegura que no haya nulos
          setProfessorsInFilteredClases(professors as IProfesor[]); // Asegura que sea de tipo IProfesor
        }
      } catch (err) {
        setError("Hubo un problema al cargar las clases. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassesData();
  }, [selectedCategory, selectedProfesor]);

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
                  setSelectedProfesor(null);  // Resetea el profesor cuando cambias de categoría
                }}
                className="border border-accent bg-secondary2 text-primary rounded px-2 py-1 focus:ring-accent focus:border-accent transition"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.nombre}>
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
      className="border border-accent bg-secondary2 text-primary rounded px-2 py-1 focus:ring-accent focus:border-accent transition"
    >
      <option value="">Selecciona un profesor</option>
      {professorsInFilteredClases
        .filter((profesor) => profesor?.id) // Asegura que profesor tenga un id válido
        .reduce((unique, profesor) => {
          // Agregar profesor solo si no existe en el array (eliminando duplicados por id)
          if (!unique.some((p) => p.id === profesor.id)) {
            unique.push(profesor);
          }
          return unique;
        }, [] as IProfesor[]) // Inicia el array vacío de IProfesor
        .map((profesor) => (
          <option key={profesor.id} value={profesor.nombre}>
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
        <p className="text-primary">Cargando clases...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredClasses.length === 0 ? (
        <p className="text-secondary2">No se encontraron resultados para tu búsqueda.</p>
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


