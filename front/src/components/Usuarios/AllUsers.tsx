"use client";
import { IUsuario } from "@/interfaces/IUser";
import styles from "@/components/Usuarios/ProfileView.module.css";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/helpers/Fetch/FetchUsers";
import { useSession } from 'next-auth/react';
import { suspendUser } from "@/helpers/Fetch/FetchSuspend";
import Swal from "sweetalert2";

export default function AllUsuarios() {
  
  const [allUsers, setAllUsers] = useState<IUsuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState<number>(8); // Usuarios por página
  const { data: session } = useSession();

  const [hasMore, setHasMore] = useState(true); // Para controlar si hay más usuarios en páginas siguientes

  useEffect(() => {
    const fetchUsers = async (page:number, limit:number,) => {
      try {
        if (!session?.user.accessToken) {
            return; // Detener la ejecución
          }
        const dataUsers = await fetchAllUsers(page, limit, session.user.accessToken );
        if (Array.isArray(dataUsers)) {
          setAllUsers(dataUsers);
          console.log("data usar all users:", dataUsers)
          setHasMore(dataUsers.length === limit); // Si devuelve menos del límite, no hay más usuarios
        } else {
          console.error("La respuesta no tiene el formato esperado:", dataUsers);
          setAllUsers([]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setAllUsers([]);
      }
    };

    fetchUsers(currentPage, limit);
  }, [currentPage, limit]);

  // Funciones para cambiar de página
  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  const handleSuspend = async (usuario: IUsuario) => {
    try {
      if (!session?.user.accessToken) {
        Swal.fire({
          title: "Error",
          text: "No estás autorizado para realizar esta acción",
          icon: "error",
          customClass: {
            cancelButton: "bg-gray-300 text-black",
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
  
      // Confirmación con Swal
      const result = await Swal.fire({
        title: `¿Estás seguro de que quieres ${usuario.estado ? "suspender" : "activar"} este usuario?`,
        text: usuario.nombre,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: usuario.estado ? "Suspender" : "Activar",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: usuario.estado ? "bg-red-600 text-white" : "bg-accent text-white",
          cancelButton: "bg-gray-300 text-black",
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
  
      if (result.isConfirmed) {
        // Cambiar el estado del usuario en la API
        await suspendUser(usuario.id, !usuario.estado, session.user.accessToken);
  
        // Actualizar el estado local
        setAllUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === usuario.id ? { ...u, estado: !u.estado } : u
          )
        );
  
        // Notificación de éxito
        Swal.fire({
          title: "Éxito",
          text: `El usuario ha sido ${usuario.estado ? "suspendido" : "activado"} correctamente.`,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-accent text-white",
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
      console.error("Error al suspender/activar el usuario:", error);
  
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al realizar la acción. Inténtalo nuevamente.",
        icon: "error",
        customClass: {
          confirmButton: "bg-gray-300 text-white",
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
  

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-3xl font-bold">Todos los Usuarios</h1>

      <div className={styles.gridContainer}>
  {allUsers.map((usuario) => (
    <div key={usuario.id} className={styles.card}>
      <h4 className={styles.userName}>{usuario.nombre.toUpperCase()}</h4>
      <div className={styles.userDetails}>
        <p>Telefono: {usuario.telefono ?? "Sin teléfono"}</p>
        <p>Email: {usuario.email}</p>
        <p>Edad: {usuario.edad ?? "Edad no especificada"}</p>
        <p> Rol: {usuario.rol} </p>
      </div>
      {/*<button
        className={styles.editButton}
        onClick={() => router.push(`/editar-usuario/${usuario.id}`)}
      >
        Editar Perfil
      </button>
      <button
        className={styles.editButton}
        onClick={() => router.push(
          `/admin/usuarios/crearProfesor/${usuario.id}`)}
      >
       Crear Profesor
      </button>*/}
      <div className="mt-4  flex justify-center">
             <button
               className={`${usuario.estado ? "submitButtonSuspend" : "submitButton "}`}
               onClick={() => handleSuspend(usuario)}
                >
                  { usuario.estado
                    ? "Suspender Usuario"
                    : "Activar Usuario"}
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
          disabled={currentPage === 1} // Deshabilita en la primera página
        >
          Anterior
        </button>
        <span className="text-xl font-bold">Página {currentPage}</span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          onClick={handleNextPage}
          disabled={!hasMore} // Deshabilita si no hay más usuarios
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
