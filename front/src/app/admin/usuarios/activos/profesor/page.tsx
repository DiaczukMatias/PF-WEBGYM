"use client";
import { IPerfilProfesor } from "@/interfaces/IProfesor";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import { fetchPerfilProfesores } from "@/helpers/Fetch/FetchProfesores";
import { useSession } from "next-auth/react";
import { suspendProfesor } from "@/helpers/Fetch/FetchSuspend";
import Swal from "sweetalert2";

export default function Profesores() {
  const { data: session } = useSession();
  const [allProfesores, setAllProfesores] = useState<IPerfilProfesor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8); // Profesores por página
  const [hasMore, setHasMore] = useState(true); // Control para la paginación

  useEffect(() => {
    const fetchAllProfesores = async () => {
      try {
        if (!session?.user.accessToken) return; // Detener si no hay token

        const profesores = await fetchPerfilProfesores();
        if (Array.isArray(profesores)) {
          setAllProfesores(profesores);
          setHasMore(profesores.length === limit); // Controlar si hay más páginas
        } else {
          console.error("Respuesta inesperada:", profesores);
          setAllProfesores([]);
        }
      } catch (error) {
        console.error("Error al obtener profesores:", error);
        setAllProfesores([]);
      }
    };

    fetchAllProfesores();
  }, [session?.user.accessToken]);

  const handleSuspend = async (profesor: IPerfilProfesor) => {
    try {
      if (!session?.user.accessToken) {
        Swal.fire({
          title: "Error",
          text: "No estás autorizado para realizar esta acción.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-gray-300 text-black",
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.classList.add("bg-dark", "text-white");
              popup.style.backgroundColor = "#333";
              popup.style.color = "white";
            }
          },
        });
        return;
      }

      const result = await Swal.fire({
        title: `¿Estás seguro de que quieres ${profesor.estado ? "suspender" : "activar"} a este profesor?`,
        text: profesor.nombre,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: profesor.estado ? "Suspender" : "Activar",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: profesor.estado ? "bg-red-600 text-white" : "bg-green-600 text-white",
          cancelButton: "bg-gray-300 text-black",
        }, didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add("bg-dark", "text-white");
            popup.style.backgroundColor = "#333";
            popup.style.color = "white";
          }
        },
      });

      if (result.isConfirmed) {
        await suspendProfesor(profesor.id, !profesor.estado, session.user.accessToken);

        setAllProfesores((prevProfesores) =>
          prevProfesores.map((p) =>
            p.id === profesor.id ? { ...p, estado: !p.estado } : p
          )
        );

        Swal.fire({
          title: "Éxito",
          text: `El profesor ha sido ${profesor.estado ? "suspendido" : "activado"} correctamente.`,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-green-600 text-white",
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.classList.add("bg-dark", "text-white");
              popup.style.backgroundColor = "#333";
              popup.style.color = "white";
            }
          },
        });
      }
    } catch (error) {
      console.error("Error al suspender/activar al profesor:", error);

      Swal.fire({
        title: "Error",
        text: "Hubo un problema al realizar la acción. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-gray-300 text-black",
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add("bg-dark", "text-white");
            popup.style.backgroundColor = "#333";
            popup.style.color = "white";
          }
        },
      });
    }
  };

  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-3xl font-bold">PROFESORES</h1>
      <div className={styles.gridContainer}>
        {allProfesores.map((profesor) => (
          <div key={profesor.id} className={styles.card}>
            <h4 className={styles.userName}>{profesor.nombre.toUpperCase()}</h4>
            <div className={styles.userDetails}>
              <p>Certificación: {profesor.certificacion ?? "Sin certificación"}</p>
              <p>Descripción: {profesor.descripcion}</p>
              <p>Clases:</p>
              {profesor.clases && profesor.clases.length > 0 ? (
                <ul>
                  {profesor.clases.map((clase) => (
                    <li key={clase.id} className={styles.claseItem}>
                      {clase.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tiene clases asignadas.</p>
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className={`${
                  profesor.estado ? "submitButtonSuspend" : "submitButton"
                }`}
                onClick={() => handleSuspend(profesor)}
              >
                {profesor.estado ? "Suspender Profesor" : "Activar Profesor"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-xl font-bold">Página {currentPage}</span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          onClick={handleNextPage}
          disabled={!hasMore}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
