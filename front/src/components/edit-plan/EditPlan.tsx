"use client";
import React, { useEffect, useState } from "react";
import { IMembresia } from "@/interfaces/IMembresia";
import { obtenerMembresias } from "@/helpers/Fetch/FetchMembresias";
import { actualizarPrecioMembresia } from "@/helpers/Fetch/FetchMembresias"; // Importa tu handler de edición
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const EditPlanForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [membresia, setMembresia] = useState<IMembresia | null>(null);
  const [nuevoPrecio, setNuevoPrecio] = useState<number>(0); // Solo para actualizar el precio

  // Fetch y seteo de datos iniciales
  useEffect(() => {
    const fetchMembresia = async () => {
      try {
        const response = await obtenerMembresias(1, 5);
        const data = response.data.find((item: IMembresia) => item.id === id); // Busca la membresía con el ID
        if (data) {
          setMembresia(data);
          setNuevoPrecio(data.precio); // Inicializa el precio para edición
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró la membresía con el ID especificado.",
          });
          router.push("/membresias"); // Redirige si no encuentra la membresía
        }
      } catch (error) {
        console.error("Error al obtener la membresía:", error);
      }
    };

    if (id) fetchMembresia();
  }, [id, router]);

  // Handle para enviar la actualización
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!membresia) return;

    const accessToken = session?.user.accessToken;
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo autenticar la solicitud. Por favor, inicia sesión nuevamente.",
      });
      return;
    }

    try {
        if (!membresia || !membresia.id) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se puede actualizar la membresía debido a un ID inválido.",
            });
            return;
          }
      const response = await actualizarPrecioMembresia(
        membresia.id,
        nuevoPrecio,
        accessToken
      );
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Membresía actualizada",
          text: "El precio de la membresía se actualizó con éxito.",
        });
        router.push("/membresias"); // Redirige después de actualizar
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar la membresía.",
      });
      console.error("Error al actualizar la membresía:", error);
    }
  };

  if (!membresia) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium mb-1">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={membresia.nombre}
          disabled
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={membresia.descripcion}
          disabled
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="precio" className="block text-sm font-medium mb-1">
          Precio (Editar):
        </label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={nuevoPrecio}
          onChange={(e) => setNuevoPrecio(Number(e.target.value))}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="duracionEnMeses" className="block text-sm font-medium mb-1">
          Duración (meses):
        </label>
        <input
          type="number"
          id="duracionEnMeses"
          name="duracionEnMeses"
          value={membresia.duracionEnMeses}
          disabled
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-accent text-white rounded hover:bg-accent-dark disabled:opacity-50"
          disabled={nuevoPrecio <= 0}
        >
          Actualizar Precio
        </button>
      </div>
    </form>
  );
};

export default EditPlanForm;
