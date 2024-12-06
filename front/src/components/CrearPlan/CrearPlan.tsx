
"use client"
import React, { useState } from "react";
import { IMembresia } from "@/interfaces/IMembresia";
import { crearMembresia } from "@/helpers/Fetch/FetchMembresias";
import Swal from "sweetalert2";

const CrearPlanForm: React.FC = () => {
  const [nuevoPlan, setNuevoPlan] = useState<IMembresia>({
    nombre: "",
    descripcion: "",
    precio: 0,
    duracionEnMeses: 0,
    features: [], // Características iniciales vacías
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNuevoPlan((prevPlan) => ({
      ...prevPlan,
      [name]:
        name === "precio" || name === "duracionEnMeses"
          ? Math.max(parseInt(value, 10) || 0, 0) // Asegura que el valor sea mayor o igual a 0
          : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...(nuevoPlan.features ?? [])];
    updatedFeatures[index] = value;
    setNuevoPlan((prevPlan) => ({
      ...prevPlan,
      features: updatedFeatures,
    }));
  };

  const addFeature = () => {
    setNuevoPlan((prevPlan) => ({
      ...prevPlan,
      features: [...(prevPlan.features ?? []), ""],
    }));
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...(nuevoPlan.features ?? [])];
    updatedFeatures.splice(index, 1);
    setNuevoPlan((prevPlan) => ({
      ...prevPlan,
      features: updatedFeatures,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !nuevoPlan.nombre ||
      !nuevoPlan.descripcion ||
      nuevoPlan.precio <= 0 ||
      (nuevoPlan.duracionEnMeses ?? 0) <= 0  ||
      !(nuevoPlan.features?.every((feature) => feature.trim()))
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete todos los campos correctamente.",
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
      
      return;
    }
    

    try {
      const response = await crearMembresia(nuevoPlan);
      if (response) {
        Swal.fire({
          position: "top",
          icon: "success",
          title:  "Membresía creada con éxito",
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
        
        setNuevoPlan({
          nombre: "",
          descripcion: "",
          precio: 0,
          duracionEnMeses: 0,
          features: [""],
        });
      }
    } catch (error) {
      console.error("Error al crear membresia:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al crear la membresía.",
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nuevoPlan.nombre}
          onChange={handleChange}
          placeholder="Nombre del plan"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={nuevoPlan.descripcion}
          onChange={handleChange}
          placeholder="Descripción del plan"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Características:</label>
        {(nuevoPlan.features ?? []).map((feature, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder={`Característica ${index + 1}`}
              className="p-2 border border-gray-300 rounded-md bg-transparent w-full"
              required
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="text-red-600"
            >
              Quitar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="mt-2 text-blue-600"
        >
          Agregar Característica
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="precio" className="block text-sm font-medium">
          Precio:
        </label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={nuevoPlan.precio}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          min="0"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="duracionEnMeses" className="block text-sm font-medium">
          Duración (meses):
        </label>
        <input
          type="number"
          id="duracionEnMeses"
          name="duracionEnMeses"
          value={nuevoPlan.duracionEnMeses ?? ""}
          onChange={handleChange}
          min="1"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={
            !nuevoPlan.nombre ||
            !nuevoPlan.descripcion ||
            !(nuevoPlan.duracionEnMeses ?? 0) || // Manejar undefined
            !(nuevoPlan.features?.length) || // Validar longitud de features
            !(nuevoPlan.precio ?? 0) // Manejar undefined
          }
        >
          Crear Plan
        </button>
      </div>
    </form>
  );
};

export default CrearPlanForm;
