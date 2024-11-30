"use client";
import { createInscripcion } from "@/helpers/Fetch/FetchIncripciones";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IClase } from "@/interfaces/IClase";
import { suspendClase } from "@/helpers/Fetch/FetchSuspend";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


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
  const router = useRouter();

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
    try {
      if (!session?.user.accessToken) {
        Swal.fire({
          title: "Error",
          text: "No estas autorizado para realizar esta acción",
          icon: "error",
          showCancelButton: true,
          customClass: {
            cancelButton: 'bg-gray-300 text-black', // Botón de cancelar gris claro con texto negro
          },
          didOpen: () => {
            const popup = Swal.getPopup(); // Obtener el popup
            if (popup) {
              popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
              // Forzar los estilos aquí también si no se aplican correctamente
              popup.style.backgroundColor = '#333'; // Fondo oscuro manualmente
              popup.style.color = 'white'; // Color blanco para el texto
            }
          },
        });
        return;
      }

          // Confirmación con Swal
    const result = await Swal.fire({
      title: `¿Estás seguro de que quieres ${estado ? "activar" : "suspender"} la clase?`,
      text: `${nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: estado ? "Activar" : "Suspender",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: estado ? 'bg-accent text-white' : 'bg-red-600 text-white',
        cancelButton: 'bg-gray-300 text-black',
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          popup.style.backgroundColor = '#333'; // Fondo oscuro
          popup.style.color = 'white'; // Texto blanco
        }
      }
    });

    if (result.isConfirmed) {
      // Si confirma, realiza la acción
      setLoading(true);
    
      await suspendClase( id, estado, session.user.accessToken);

      setLoading(false);

      Swal.fire({
        title: "Éxito",
        text: `La clase ha sido ${estado ? "activada" : "suspendida"} correctamente.`,
        icon: "success",
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
        },
      }).then(() => {
        router.push("/clases"); // Redirige a la página principal o donde prefieras
      });
    }
    } catch (error) {
      setLoading(false);
      console.error("Error al suspender la clase:", error);

      Swal.fire({
        title: "Error",
        text: "Hubo un problema al realizar la acción. Inténtalo nuevamente.",
        icon: "error",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
    }
  };


  // Función para manejar el evento de inscripción
  const handleInscribirse = async () => {
    setInscripcionLoading(true);
    setInscripcionError(null); // Limpiar cualquier error previo
    setInscripcionExito(null); // Limpiar el estado de éxito

   
    try {
      if (session?.user.id && clase.id) {
      await createInscripcion(session?.user.id, clase.id); // Usamos el ID del usuario y el ID de la clase
      setInscripcionExito(true); // Inscripción exitosa 
      }
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
               className={`${estado ? "submitButtonSuspend" : "submitButton "}`}
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
          )}

        </div>
      </div>

      <div className="flex justify-center items-center">
      
      
      </div>
    </div>
  );
};

export default ClassCard;
