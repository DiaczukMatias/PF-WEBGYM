"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ClassCardList from "@/components/CardList/CardList";
import { getCategoriesActivas } from "@/helpers/Fetch/FetchCategorias";
import { searchClases, fetchClases } from "@/helpers/Fetch/FetchClases";
import { ICategoria } from "@/interfaces/ICategory";
import { ISearchResult } from "@/interfaces/ISearch";
import { IProfesor } from "@/interfaces/IProfesor";
import styles from '@/views/Clases/Clases.module.css';


const ClasesView = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin/clases";

  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<ISearchResult[]>([]);
  const [professorsInFilteredClases, setProfessorsInFilteredClases] = useState<
    IProfesor[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProfesor, setSelectedProfesor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategoriesActivas();
        setCategories(data);
      } catch (error) {
        console.error(error)
        setErrorCategories(
          "Hubo un problema al cargar las categorías. Intenta más tarde."
        );
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
  }, [selectedCategory, selectedProfesor]);

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedProfesor(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterButtonContainer}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={styles.filterButton}
        >
          {showFilters ? "Ocultar Filtros" : "Filtrar Clases"}
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersContainer}>
          <div>
            <h3>Categorías</h3>
            {loadingCategories ? (
              <p>Cargando categorías...</p>
            ) : errorCategories ? (
              <p className={styles.errorText}>{errorCategories}</p>
            ) : (
              <select
                value={selectedCategory || ""}
                onChange={(e) => {
                  setSelectedCategory(e.target.value || null);
                  setSelectedProfesor(null);
                }}
                className={styles.select}
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

          {selectedCategory && professorsInFilteredClases.length > 0 && (
            <div>
              <h3>Profesores</h3>
              <select
                value={selectedProfesor || ""}
                onChange={(e) => setSelectedProfesor(e.target.value || null)}
                className={styles.select}
              >
                <option value="">Selecciona un profesor</option>
                {professorsInFilteredClases
                  .filter((profesor) => profesor?.id)
                  .reduce((unique, profesor) => {
                    if (!unique.some((p) => p.id === profesor.id)) {
                      unique.push(profesor);
                    }
                    return unique;
                  }, [] as IProfesor[])
                  .map((profesor) => (
                    <option key={profesor.id} value={profesor.nombre}>
                      {profesor.nombre}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div>
            <h3>Filtros seleccionados</h3>
            {selectedCategory && <p>Categoría: {selectedCategory}</p>}
            {selectedProfesor && <p>Profesor: {selectedProfesor}</p>}
            <button onClick={handleClearFilters} className={styles.clearButton}>
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      <h2 className={styles.title}>
        <span className={styles.titleWhite}>CLASES</span>{" "}
        <span className={styles.titleGreen}>DISPONIBLES</span>
      </h2>

      {loading ? (
        <p>Cargando clases...</p>
      ) : error ? (
        <p className={styles.errorText}>{error}</p>
      ) : filteredClasses.length === 0 ? (
        <p>No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <ClassCardList classes={filteredClasses} />
      )}

      {isAdminRoute && (
        <div>
          <button onClick={() => (window.location.href = `/crearClase`)}>
            Crear Clase
          </button>
        </div>
      )}
    </div>
  );
};

export default ClasesView;

