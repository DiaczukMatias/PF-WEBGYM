"use client";
import { createInscripcion } from "@/helpers/Fetch/FetchIncripciones";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IClase } from "@/interfaces/IClase";
import { suspendClase } from "@/helpers/Fetch/FetchSuspend";


interface ClassCardProps {
  clase: IClase;
}

const ClassCard: React.FC<ClassCardProps> = ({ clase }) => {

  const {
    nombre,
    descripcion,
    fecha,
    imagen,
    categoria,
    perfilProfesor,
    disponibilidad,
    id,
    estado = true,
  } = clase;

  const { data: session } = useSession();
  const rolUsuario = session?.user?.rol;
  const usuarioNombre = session?.user?.name || "";

  const formattedHorario = new Date(fecha).toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isClaseDelProfesor = perfilProfesor?.nombre === usuarioNombre;
  const mostrarBotonInscribirse =
    rolUsuario === "cliente" ||
    (rolUsuario === "profesor" && !isClaseDelProfesor);
  const mostrarBotonEditarClase =
    rolUsuario === "admin" || (rolUsuario === "profesor" && isClaseDelProfesor);

  const [isSuspendConfirmVisible, setIsSuspendConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inscripcionLoading, setInscripcionLoading] = useState(false); // Nuevo estado para manejar la carga de la inscripción
  const [inscripcionError, setInscripcionError] = useState<string | null>(null); // Nuevo estado para manejar errores
  const [inscripcionExito, setInscripcionExito] = useState<boolean | null>(null); // Estado para manejar el éxito de la inscripción


  const handleSuspendClass = async (estado: boolean) => {
    setLoading(true);
  
    try { 
      if (!session?.user.accessToken) {
      console.error('El token de acceso no está disponible.');
      setLoading(false);
      return; // Detener la ejecución
    }
      
      await suspendClase( id, estado, session.user.accessToken);
      setLoading(false);
      setIsSuspendConfirmVisible(false);
    } catch (error) {
      console.error("Error al suspender la clase:", error);
      setLoading(false);
    }
  };

  //const showSuspendConfirmation = () => setIsSuspendConfirmVisible(true);
  const cancelSuspend = () => setIsSuspendConfirmVisible(false);


  // Función para manejar el evento de inscripción
  const handleInscribirse = async () => {
    setInscripcionLoading(true);
    setInscripcionError(null); // Limpiar cualquier error previo
    setInscripcionExito(null); // Limpiar el estado de éxito

    const usuarioId = session?.user.id ?? ""
    const claseId = clase.id
    try {
      await createInscripcion(usuarioId, claseId); // Usamos el ID del usuario y el ID de la clase
      setInscripcionExito(true); // Inscripción exitosa
    } catch (error) {
      setInscripcionError("Error al inscribirse en la clase");
      console.error("Error al inscribirse:", error);
    } finally {
      setInscripcionLoading(false);
    }
  };

  return (
    <div>
      <div className="flex max-w-full min-h-80 rounded-lg overflow-hidden shadow-lg border border-accent">
        <div className="w-1/2">
          {imagen && (
            <Image
              src={`${clase.imagen}`}
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
          <p className="text-sm text-secondary2 mt-1">
            Categoria: {categoria?.nombre}
          </p>
          <p className="text-sm text-secondary mt-2">
            Profesor: {perfilProfesor?.nombre}
          </p>
          <p className="text-sm text-secondary2 mt-2">{descripcion}</p>
          <p className="text-sm text-secondary2 mt-2">
            Fecha: {formattedHorario}
          </p>
          <p className="text-sm text-secondary2 mt-2">
            Cupos disponibles: {disponibilidad}
          </p>

          <div className="mt-4 flex justify-center ">
            {mostrarBotonInscribirse && (
              <button className="submitButton .submitButton:hover "
              onClick={handleInscribirse} // Llama a la función cuando se hace click
              disabled={inscripcionLoading} // Deshabilita el botón mientras se procesa la inscripción 
              >
                {inscripcionLoading ? "Cargando..." : "Inscribirse"}
              </button>
            )}
            {inscripcionExito && (
            <p className="text-accent mt-2">¡Inscripción exitosa!</p>
          )}
          {inscripcionError && (
            <p className="text-red-500 mt-2">{inscripcionError}</p>
          )}
            {mostrarBotonEditarClase && (
              <button
                className="submitButton .submitButton:hover"
                onClick={() => (window.location.href = `/editar-clase/${id}`)}
              >
                Editar Clase
              </button>
            )}
          </div>

          {mostrarBotonEditarClase && (
            <div className="mt-4  flex justify-center">
              <button
               className={`submitButton ${estado ? "submitButtonSuspend" : ""}`}
               onClick={() => handleSuspendClass(!estado)}
               disabled={loading}
             >
               {loading
                 ? estado ? "Suspendiendo..." : "Activando..." : estado ? "Suspender Clase": "Activar Clase"}              
              </button>
            </div>
          )}


          {isSuspendConfirmVisible && (
            <div className="confirmation-modal">
          <p>
            ¿Estás seguro de que quieres{" "}
            {estado ? "suspender" : "activar"} la clase: {nombre}?
          </p>
              <div className="flex gap-2">
                <button
                  className="m-2 p-2 border rounded-lg border-white text-white"
                  onClick={cancelSuspend}
                >
                  Cancelar
                </button>
                <button
                  className="m-2 p-2 border rounded-lg border-red-700 text-red-700"
                  onClick={() => handleSuspendClass(!estado)}
                  disabled={loading}
                >
                  {loading
                    ? estado
                      ? "Suspendiendo..."
                      : "Activando..."
                    : estado
                    ? "Suspender Clase"
                    : "Activar Clase"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
      
      
      </div>
    </div>
  );
};

export default ClassCard;
