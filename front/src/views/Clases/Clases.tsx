"use client";
import { useState } from "react";
import ClassCardList from "@/components/CardList/CardList";
import { categoriesData, profesoresData, clasesData } from "@/helpers/datatemporalClases";
import { getDayOfWeek } from "@/helpers/dataconvertir";

const ClasesView = () => {
  // Estados para manejar los filtros
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedProfesor, setSelectedProfesor] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Función para manejar la selección de categoría
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory((prevState) =>
      prevState.includes(categoryId)
        ? prevState.filter((id) => id !== categoryId)
        : [...prevState, categoryId]
    );
  };

  // Función para manejar la selección de profesor
  const handleSelectProfesor = (profesorId: string) => {
    setSelectedProfesor(profesorId);
  };

  // Función para manejar la limpieza de filtros
  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSelectedProfesor(null);
    setSelectedDay(null);
  };

  // Filtrar las clases según los filtros seleccionados
  const filteredClasses = clasesData.filter((clase) => {
    const categoryMatch = selectedCategory.length
      ? selectedCategory.includes(clase.categoriaId)
      : true;
    const profesorMatch = selectedProfesor
      ? clase.perfilProfesor?.id === selectedProfesor
      : true;
    const dayMatch = selectedDay
      ? getDayOfWeek(String(clase.fecha)) === selectedDay
      : true;

    return categoryMatch && profesorMatch && dayMatch;
  });

  return (
    <div>
      {/* Botón para mostrar u ocultar los filtros */}
      <div className="flex justify-start items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-accent px-4 py-2 rounded"
        >
          {showFilters ? "Ocultar Filtros" : "FILTRAR CLASES"}
        </button>
      </div>

      {/* Mostrar filtros solo si el estado showFilters es true */}
      {showFilters && (
        <div className="flex justify-between items-start my-4">
          <div className="flex flex-col w-1/2">
            {/* Filtro de categorías con checkboxes */}
            <div>
              <h3 className="text-accent font-bold mb-2">Filtrar por categoría</h3>
              <div className="flex flex-wrap gap-4">
                {categoriesData.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategory.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtro de profesores con checkboxes */}
            <div className="mt-4">
              <h3 className="text-accent font-bold mb-2">Filtrar por profesor</h3>
              <div className="flex flex-wrap gap-4">
                {profesoresData.map((profesor) => (
                  <div key={profesor.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`profesor-${profesor.id}`}
                      checked={selectedProfesor === profesor.id}
                      onChange={() => handleSelectProfesor(profesor.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`profesor-${profesor.id}`} className="text-sm">
                      {profesor.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filtros seleccionados */}
          <div className="w-1/3 p-4 border rounded bg-gray-100 ">
            {/* Botón "Limpiar filtros" */}
            <button
              onClick={handleClearFilters}
              className=" right-2 top-2 text-white bg-red-500 py-1 px-3 rounded"
            >
              Limpiar filtros
            </button>
            <h3 className="text-accent font-bold mb-2">Filtros seleccionados</h3>
            <div>
              {selectedCategory.length > 0 && (
                <p>
                  <strong>Categorías:</strong>{" "}
                  {selectedCategory
                    .map(
                      (id) =>
                        categoriesData.find((category) => category.id === id)?.nombre
                    )
                    .join(", ")}
                </p>
              )}
              {selectedProfesor && (
                <p>
                  <strong>Profesor:</strong>{" "}
                  {profesoresData.find((p) => p.id === selectedProfesor)?.nombre}
                </p>
              )}
              {selectedDay && (
                <p>
                  <strong>Día:</strong> {selectedDay}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Listado de clases filtradas */}
      <h2 className="flex justify-center font-bold font-sans text-xl text-accent m-4">
        CLASES:
      </h2>
      <ClassCardList classes={filteredClasses} />
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