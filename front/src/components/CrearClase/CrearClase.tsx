"use client";
import React, { useState, useEffect } from "react";
import { validateCrearClase } from "@/helpers/validate/validateCrearClase";
import { ICrearClase } from "@/interfaces/IClase";
import { IPerfilProfesor } from "@/interfaces/IProfesor";
import { ICategoria } from "@/interfaces/ICategory";
import { getCategoriesActivas } from "@/helpers/Fetch/FetchCategorias";
import { fetchPerfilProfesores } from "@/helpers/Fetch/FetchProfesores";
import { createClase } from "@/helpers/Fetch/FetchClases";
import { useSession } from 'next-auth/react';
import Swal from "sweetalert2";


const CrearClaseForm: React.FC = () => {
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [profesores, setProfesores] = useState<IPerfilProfesor[]>([]); // Para almacenar los profesores
  const { data: session } = useSession();
  console.log('session en crearCalse', session);
  
  const [nuevaClase, setNuevaClase] = useState<ICrearClase>({
    nombre: "",
    descripcion: "",
    fecha: "",
    categoriaId: "",
    imagen: null ,
    disponibilidad: 1,
    perfilProfesorId: "", 
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategoriesYProfesores = async () => {
      try {
      
        const categoriasData = await  getCategoriesActivas();;
        const profesoresData = await fetchPerfilProfesores(); // Llamar a la función para obtener los profesores
        setCategories(categoriasData);
        setProfesores(profesoresData);

      } catch (error) {
        console.error("Error al obtener las categorías o perfil profesores:", error);
      }
    };
    
    fetchCategoriesYProfesores();
  }, []);    




  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNuevaClase((prevClase) => ({
      ...prevClase,
      [name]: name === "disponibilidad" ? Math.max(parseInt(value, 10) || 1, 1) : value,
    }));

    // Validar el campo actualizado
    const nuevosErrores = await validateCrearClase({
      ...nuevaClase,
      [name]: value,
    });

    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: nuevosErrores[name] || "",
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setErrores((prevErrores) => ({
          ...prevErrores,
          imagen: "El archivo es demasiado grande (máximo 10MB).",
        }));
        return;
      }
      setNuevaClase((prevClase) => ({
        ...prevClase,
        imagen: file,
      }));
      setErrores((prevErrores) => ({ ...prevErrores, imagen: "" }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const nuevosErrores = await validateCrearClase(nuevaClase);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    try {
      	//damos el formato correcto para enviar archivos
        const formData = new FormData();
        formData.append("nombre", nuevaClase.nombre);
    formData.append("descripcion", nuevaClase.descripcion);
    formData.append("fecha", nuevaClase.fecha)
    formData.append("categoriaId", nuevaClase.categoriaId);
    formData.append("disponibilidad", nuevaClase.disponibilidad.toString());
    formData.append("perfilProfesorId", nuevaClase.perfilProfesorId);
    if (nuevaClase.imagen instanceof File) {
      formData.append("imagen", nuevaClase.imagen);
    }

    const response = await createClase( formData, session?.user.accessToken || '');
    if (!response.ok) {
      throw new Error("Error al crear la clase");
    }
    Swal.fire({
      position: "top",
      icon: "success",
      title:  "Clase creada con éxito",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        confirmButton: 'bg-accent text-white',
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.classList.add('bg-dark', 'text-white');
          popup.style.backgroundColor = '#333'; // Fondo oscuro
          popup.style.color = 'white'; // Texto blanco
        }
      },
    });
      setNuevaClase({
        nombre: "",
        descripcion: "",
        fecha: "",
        categoriaId: "",
        imagen: null,
        disponibilidad: 1,
        perfilProfesorId: "",
      });
      setErrores({});
    } catch (error) {
      console.error("Error al crear la clase:", error);

Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Error al crear la clase",
  customClass: {
    confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
  },
  didOpen: () => {
    const popup = Swal.getPopup();
    if (popup) {
      popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
      popup.style.backgroundColor = "#333";
      popup.style.color = "white";
    }}
});
    }
  };

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
        CREAR CLASE
      </h1>
      <form onSubmit={handleSubmit} >
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
    Día y Hora:
  </label>
  <div className="flex gap-2">
    {/* Selector de días */}
    <select
      id="dia"
      name="dia"
      onChange={(e) =>
        setNuevaClase((prevClase) => ({
          ...prevClase,
          fecha: `${e.target.value} ${prevClase.fecha.split(" ")[1] || "09:00"}`,
        }))
      }
      className="select-custom mt-1 p-2 w-full border-2 border-lime-400 rounded-md bg-gray-800 text-white hover:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-50"
    >
      <option className="bg-gray-700 text-gray-400" value="">Selecciona un día</option>
      <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" value="Lunes">Lunes</option>
      <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" value="Martes">Martes</option>
      <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" value="Miércoles">Miércoles</option>
      <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" value="Jueves">Jueves</option>
      <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" value="Viernes">Viernes</option>
      <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" value="Sábado">Sábado</option>
    </select>

    {/* Selector de horas */}
    <select
      id="hora"
      name="hora"
      onChange={(e) =>
        setNuevaClase((prevClase) => ({
          ...prevClase,
          fecha: `${prevClase.fecha.split(" ")[0] || "Lunes"} ${e.target.value}`,
        }))
      }
      className="select-custom mt-1 p-2 w-full border-2 border-lime-400 rounded-md bg-gray-800 text-white hover:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-50"
    >
      <option value="" className="bg-gray-700 text-gray-400">Selecciona una hora</option>
      {Array.from({ length: 12 }, (_, i) => {
        const hour = 9 + i;
        return (
          <option className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300" key={hour} value={`${hour}:00`}>
            {hour}:00
          </option>
        );
      })}
    </select>
  </div>
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
            className="select-custom mt-1 p-2 w-full border-2 border-lime-400 rounded-md bg-gray-800 text-white hover:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-50"
          >
            <option value="" className="bg-gray-700 text-gray-400">
              Selecciona una categoría
            </option>
            {categories.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
                className="bg-gray-800 text-white hover:bg-gray-700 hover:text-lime-300"
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
    Seleccionar imagen:
  </label>
  <input
    type="file"
    id="imagen"
    name="imagen"
    accept="image/*"
    onChange={handleFileChange}
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
            className="select-custom mt-1 p-2 w-full border-2 border-lime-400 rounded-md bg-gray-800 text-white hover:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-50"
          >
            <option value="" className="bg-gray-700 text-gray-400">
              Selecciona un profesor
            </option>
            {profesores.map((profesores) => (
              <option
                key={profesores.id}
                value={profesores.id}
                className="bg-gray-700 text-gray-400"
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
