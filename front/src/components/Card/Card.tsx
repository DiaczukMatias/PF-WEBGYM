"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IClase } from "@/interfaces/IClase";
import { deleteClase } from "@/helpers/Fetch/FetchClases";

interface ClassCardProps {
  clase: IClase;
}

const ClassCard: React.FC<ClassCardProps> = ({ clase }) => {
  const { nombre, descripcion, fecha, imagen, categoria, perfilProfesor, disponibilidad, id } = clase;

  const { data: session } = useSession();
  const rolUsuario = session?.user?.rol;
  const profesorId = session?.user?.name || "";

  const formattedHorario = new Date(fecha).toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isClaseDelProfesor = perfilProfesor?.nombre === profesorId;
  //const mostrarBotonInscribirse = rolUsuario === "cliente" || (rolUsuario === "profesor" && !isClaseDelProfesor);
  const mostrarBotonEditarClase = rolUsuario === "admin" || (rolUsuario === "profesor" && isClaseDelProfesor);

  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  

  // Manejo de eliminación
  const handleDeleteClass = async () => {
    setLoading(true);
    try {
      await deleteClase(id);
      // Redirigir a la página de clases usando window.location
      window.location.href = "/clases";
    } catch (error) {
      setLoading(false);
      console.error("Error al eliminar la clase:", error);
    }
  };

  const showDeleteConfirmation = () => setIsDeleteConfirmVisible(true);
  const cancelDelete = () => setIsDeleteConfirmVisible(false);

  return (
    <div>
    <div className="flex max-w-full min-h-80 rounded-lg overflow-hidden shadow-lg border border-accent">
      <div className="w-1/2">
        {imagen && (
          <Image
          src={`/images/clases/${clase.nombre.toLowerCase()}.jpg`}  
          alt={nombre}
            width={350}
            height={200}
            className="w-full object-cover"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-center text-2xl font-semibold text-accent .fontOswaldSans-serif">
          {nombre.toUpperCase()}
        </h3>
        <p className="text-sm text-secondary2 mt-1">Categoria: {categoria?.nombre}</p>
        <p className="text-sm text-secondary mt-2">Profesor: {perfilProfesor?.nombre}</p>
        <p className="text-sm text-secondary2 mt-2">{descripcion}</p>
        <p className="text-sm text-secondary2 mt-2">Fecha: {formattedHorario}</p>
        <p className="text-sm text-secondary2 mt-2">Cupos disponibles: {disponibilidad}</p>
       
        <div className="mt-4 flex justify-center ">
          {/*mostrarBotonInscribirse && (
            <button className="submitButton .submitButton:hover ">Inscribirse</button>
          )*/}
          {mostrarBotonEditarClase && (
            <button
              className="submitButton .submitButton:hover"
              onClick={() => window.location.href = `/editar-clase/${id}`}
            >
              Editar Clase
            </button>
          )}
        </div>

        {mostrarBotonEditarClase && (
          <div className="mt-4  flex justify-center">
            <button
              className="m-2 p-2 border rounded-lg border-white text-white"
              onClick={showDeleteConfirmation}
            >
              Eliminar Clase
            </button>
          </div>
        )}

        {isDeleteConfirmVisible && (
          <div className="confirmation-modal">
            <p>¿Estás seguro de que quieres eliminar la clase: {nombre}?</p>
            <div className="flex gap-2">
              <button
                className="m-2 p-2 border rounded-lg border-white text-white"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button
                className="m-2 p-2 border rounded-lg border-red-700 text-red-700"
                onClick={handleDeleteClass}
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar Clase"}
              </button>
            </div>
          </div>
        )}
      </div>
      
    </div >
    <div className="fles justify-center items-center" >
    <button
              className="flex justify-center items-center m-2 p-2  text-white"
              onClick={() => window.location.href = `/clases`}
            >
              Ver Todas las clases
            </button>
            </div >
    </div>
  );
};

export default ClassCard;
