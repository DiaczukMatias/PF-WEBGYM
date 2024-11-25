"use client";
import React, { useState, useEffect } from "react";
import { validateCrearClase } from "@/helpers/validate/validateCrearClase";
import { createClase } from "@/helpers/Fetch/FetchClases";
import { ICrearClase } from "@/interfaces/IClase";
import { ICategoria } from "@/interfaces/ICategory";
import { getCategories } from "@/helpers/Fetch/FetchCategorias";
import { fetchPerfilProfesores } from "@/helpers/Fetch/FetchProfesores";
import { IPerfilProfesor } from "@/interfaces/IProfesor";


const CrearClaseForm: React.FC = () => {
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [profesores, setProfesores] = useState<IPerfilProfesor[]>([]); // Para almacenar los profesores


  const [nuevaClase, setNuevaClase] = useState<ICrearClase>({
    nombre: "",
    descripcion: "",
    fecha: "",
    categoriaId: "",
    imagen: "",
    disponibilidad: 1,
    perfilProfesorId: "", 
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategoriesYProfesores = async () => {
      try {
        const categoriasData = await getCategories();
        console.log("Categorías obtenidas:", categoriasData); // Para verificar si las categorías se cargan correctamente
        const profesoresData = await fetchPerfilProfesores(); // Llamar a la función para obtener los profesores
        setCategories(categoriasData);
        setProfesores(profesoresData);
        console.log("profesoresdata:",profesoresData)
        console.log("categoriesdata:", categoriasData)

      } catch (error) {
        console.error("Error al obtener las categorías o perfil profesores:", error);
      }
    };
    
    fetchCategoriesYProfesores();
  }, []);    




  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Cambio detectado en ${name}:`, value);

    setNuevaClase((prevClase) => ({
      ...prevClase,
      [name]: name === "disponibilidad" ? Math.max(parseInt(value, 10) || 1, 1) : value,
    }));

    // Validar el campo actualizado
    const nuevosErrores = validateCrearClase({
      ...nuevaClase,
      [name]: value,
    });

    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: nuevosErrores[name] || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Datos enviados:", nuevaClase); // Verificar qué datos se envían
    const nuevosErrores = validateCrearClase(nuevaClase);
    setErrores(nuevosErrores);
    console.log("Errores de validación:", nuevosErrores); // Mostrar los errores de validación si existen

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    try {
      await createClase(nuevaClase);
      alert("Clase creada con éxito");
      setNuevaClase({
        nombre: "",
        descripcion: "",
        fecha: "",
        categoriaId: "",
        imagen: "/images/clases/zumba.jpg",
        disponibilidad: 1,
        perfilProfesorId: "",
      });
      setErrores({});
    } catch (error) {
      console.error("Error al crear la clase:", error);
      console.log("Datos a enviar:", nuevaClase);
console.log("Errores de validación:", errores);

      alert("Error al crear la clase");
    }
  };

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
        CREAR CLASE
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nuevaClase.nombre}
            onChange={handleChange}
            placeholder="Nombre de la clase"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
          {errores.nombre && <div className="text-red-500 text-sm mt-1">{errores.nombre}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={nuevaClase.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la clase"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
          {errores.descripcion && (
            <div className="text-red-500 text-sm mt-1">{errores.descripcion}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fecha" className="block text-sm font-medium">
            Fecha:
          </label>
          <input
            type="datetime-local"
            id="fecha"
            name="fecha"
            value={nuevaClase.fecha}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
          {errores.fecha && <div className="text-red-500 text-sm mt-1">{errores.fecha}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium">
            Categoría:
          </label>
          <select
            id="categoria"
            name="categoriaId"
            value={nuevaClase.categoriaId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-white rounded-md bg-transparent text-white hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          >
            <option value="" className="bg-gray-700 text-white">
              Selecciona una categoría
            </option>
            {categories.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
                className="bg-transparent text-white  hover:text-green-500"
              >
                {categoria.nombre}
              </option>
            ))}
          </select>
          {errores.categoria && (
            <div className="text-red-500 text-sm mt-1">{errores.categoria}</div>
          )}
        </div>

      <div className="mb-4">
          <label htmlFor="imagen" className="block text-sm font-medium">
            Imagen URL:
          </label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value= {nuevaClase.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
          {errores.imagen && <div className="text-red-500 text-sm mt-1">{errores.imagen}</div>}
        </div>


<div className="mb-4">
          <label htmlFor="perfilProfesorId" className="block text-sm font-medium">
            Seleccionar Profesor:
          </label>
          <select
            id="perfilProfesorId"
            name="perfilProfesorId"
            value={nuevaClase.perfilProfesorId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-white rounded-md bg-transparent text-white hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          >
            <option value="" className="bg-gray-700 text-white">
              Selecciona un profesor
            </option>
            {profesores.map((profesores) => (
              <option
                key={profesores.id}
                value={profesores.id}
                className="bg-transparent text-white hover:text-green-500"
              >
                {profesores.nombre}
              </option>
            ))}
          </select>
          {errores.perfilProfesorId && (
            <div className="text-red-500 text-sm mt-1">{errores.perfilProfesorId}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="disponibilidad" className="block text-sm font-medium">
            Cupos disponibles:
          </label>
          <input
            type="number"
            id="disponibilidad"
            name="disponibilidad"
            value={nuevaClase.disponibilidad || ""}
            onChange={handleChange}
            min="1"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
          {errores.disponibilidad && (
            <div className="text-red-500 text-sm mt-1">{errores.disponibilidad}</div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-md hover:text-accent border border-white"
            disabled={
              !nuevaClase.nombre ||
              !nuevaClase.descripcion ||
              !nuevaClase.fecha ||
              !nuevaClase.categoriaId ||
              !nuevaClase.imagen||
              !nuevaClase.perfilProfesorId
            }
          >
            Crear Clase
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearClaseForm;
