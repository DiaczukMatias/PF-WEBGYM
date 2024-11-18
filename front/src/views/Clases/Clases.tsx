
"use client";
import { useState } from "react";
import ClassCardList from "@/components/CardList/CardList";
import Category from "@/components/Categories/Categories";
import Profesores from "@/components/Profesor/Profesor";
import { clasesData, categoriesData, profesoresData } from "@/helpers/datatemporalClases";
import { getDayOfWeek } from "@/helpers/dataconvertir";

const ClasesView = () => {
  // Estados para manejar los filtros
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]); // Categorías seleccionadas
  const [selectedProfesor, setSelectedProfesor] = useState<string | null>(null); // Profesor seleccionado
  const [selectedDay, setSelectedDay] = useState<string | null>(null); // Día de la semana seleccionado
  const [filterType, setFilterType] = useState<'category' | 'profesor' | 'day' | null>(null); // Filtro activo
  const [showFilters, setShowFilters] = useState(false); // Mostrar u ocultar los filtros

  // Función para manejar la selección de filtro
  const handleSelectFilter = (filter: 'category' | 'profesor' | 'day') => {
    setFilterType(filter);
  };

  // Función para manejar la selección de categoría
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(prevState =>
      prevState.includes(categoryId)
        ? prevState.filter(id => id !== categoryId)
        : [...prevState, categoryId]
    );
  };

  // Función para manejar la selección de profesor
  const handleSelectProfesor = (profesorId: string) => {
    setSelectedProfesor(profesorId);
  };

  // Función para manejar la selección de día
  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
  };

  // Filtrar las clases según los filtros seleccionados
  const filteredClasses = clasesData.filter((clase) => {
    const categoryMatch = selectedCategory.length ? selectedCategory.includes(clase.categoriaId) : true;
    const profesorMatch = selectedProfesor ? clase.perfilProfesor?.id === selectedProfesor : true;
    const dayMatch = selectedDay ? getDayOfWeek(String(clase.fecha)) === selectedDay : true;

    return categoryMatch && profesorMatch && dayMatch;
  });

  return (
    <div>
     
      {/* Botón para mostrar u ocultar los filtros */}
      <div className="flex justify-start items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className=" text-accent px-4 py-2 rounded"
        >
          {showFilters ? "Ocultar Filtros" : "FILTRAR CLASES"}
        </button>
      </div>
      
      {/* Mostrar filtros solo si el estado showFilters es true */}
      {showFilters && (
        <div>
          <div className="flex justify-center items-center">
            {/* Navbar de filtros */}
            <div>
              <button
                onClick={() => handleSelectFilter('category')}
                className="m-4"
              >
                Filtrar por categoría
              </button>
              <button
                onClick={() => handleSelectFilter('profesor')}
                className="m-4"
              >
                Filtrar por profesor
              </button>
              <button
                onClick={() => handleSelectFilter('day')}
                className="m-4"
              >
                Filtrar por día de la semana
              </button>
            </div>
          </div>

          {/* Carrusel y filtros según el tipo de filtro seleccionado */}
          {filterType === 'category' && (
            <div className="filter-sidebar">
              <Category
                categories={categoriesData}
                onSelectCategory={handleSelectCategory}
                selectedCategories={selectedCategory}
              />
            </div>
          )}

          {filterType === 'profesor' && (
            <div className="filter-sidebar">
              <Profesores
                profesores={profesoresData}
                itemsPerPage={5}
                onSelectProfesor={handleSelectProfesor}
                selectedProfesor={selectedProfesor}
              />
            </div>
          )}

          {filterType === 'day' && (
            <div className="filter-sidebar">
              <div className="day-selector flex justify-center items-center gap-4">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
                  <div
                    key={day}
                    onClick={() => handleSelectDay(day)}
                    className={`day-item ${selectedDay === day ? 'selected' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}
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