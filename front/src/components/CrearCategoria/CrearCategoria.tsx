"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { createCategoria } from "@/helpers/Fetch/FetchCategorias";
import { validateCrearCategoria } from "@/helpers/validate/validateCrearCategoria";
import { useSession } from "next-auth/react";

const CrearCategoria = () => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState<File | null>(null); // Estado para la imagen
  const [errors, setErrors] = useState<{ nombre?: string }>({});
  const [inputBlur, setInputBlur] = useState<{ nombre: boolean }>({ nombre: false });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { data: session } = useSession();

  // Maneja cambios en el input del nombre
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNombre(value);

    const validationError = await (value);
    setErrors({ nombre: validationError || undefined });
  };

  // Maneja cambios en el input de archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImagen(e.target.files[0]);
    }
  };

  // Maneja el blur en el input
  const handleInputBlur = async () => {
    if (session?.user.accessToken) {
      const validationError = await validateCrearCategoria(nombre, session.user.accessToken);
      setInputBlur({ nombre: true });
      setErrors({ nombre: validationError || undefined });
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error no estás autenticado",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
      return;
    }

    const validationError = await validateCrearCategoria(nombre, session.user.accessToken);
    if (validationError) {
      setErrors({ nombre: validationError });
      return;
    }

    if (!imagen) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar una imagen",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
      
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("imagen", imagen);

    try {
      await createCategoria(formData, session.user.accessToken);
      Swal.fire({
        icon: "success",
        title:  "Categoria creada con éxito",
        showConfirmButton: false,
        timer: 3000,
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

      setNombre("");
      setImagen(null);
      setInputBlur({ nombre: false });
      setErrors({});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al crear la categoría.",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco

            popup.style.backgroundColor = '#333'; // Fondo oscuro
            popup.style.color = 'white'; // Texto blanco
          }}
      });
      console.error("Error al crear categoría:", err);
    }
  };

  // Actualiza el estado del botón de envío
  React.useEffect(() => {
    setIsSubmitDisabled(!!errors.nombre || !nombre.trim() || !imagen);
  }, [errors, nombre, imagen]);

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
        CREAR CATEGORÍA:
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto space-y-4">
        <div className="flex flex-col gap-6 mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre de la Categoría:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleChange}
            onBlur={handleInputBlur}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
            placeholder="Nombre de la categoría"
          />
          {inputBlur.nombre && errors.nombre && (
            <p className="text-red-500 text-sm mt-1">*{errors.nombre}</p>
          )}

          <label htmlFor="imagen" className="block text-sm font-medium">
            Imagen de la Categoría:
          </label>
          <input
            type="file"
            id="imagen"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />

          <button
            type="submit"
            className="bg-accent text-black py-2 px-4 rounded hover:bg-accent2 disabled:bg-gray-400"
            disabled={isSubmitDisabled}
          >
            Crear Categoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCategoria;
