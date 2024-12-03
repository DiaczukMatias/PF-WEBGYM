"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { createCategoria } from "@/helpers/Fetch/FetchCategorias";
import { validateCrearCategoria } from "@/helpers/validate/validateCrearCategoria";
import { useSession } from 'next-auth/react';



const CrearCategoria = () => {
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState<{ nombre?: string }>({});
  const [inputBlur, setInputBlur] = useState<{ nombre: boolean }>({ nombre: false });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { data: session } = useSession();

  // Maneja los cambios en el input
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNombre(value);

    const validationError = await (value);
    setErrors({ nombre: validationError || undefined});
  };

  // Maneja el blur en el input
  const handleInputBlur = async () => {
    if (session?.user.accessToken) {
    const validationError = await validateCrearCategoria(nombre, session?.user.accessToken);
    setInputBlur({ nombre: true });
    setErrors({ nombre: validationError || undefined});}
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session?.user.accessToken) {
    const validationError = await validateCrearCategoria(nombre, session?.user.accessToken);
    if (validationError) {
      setErrors({ nombre: validationError });
      return;}
    }

    try {
      await createCategoria(nombre);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Categoría creada correctamente',
        confirmButtonText: 'OK',
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
        },  })
      setNombre("");
      setInputBlur({ nombre: false });
      setErrors({});
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear la categoría",
        icon: "error",
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
    setIsSubmitDisabled(!!errors.nombre || !nombre.trim());
  }, [errors, nombre]);

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
