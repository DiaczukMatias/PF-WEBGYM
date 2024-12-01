"use client";
import { IUsuario} from "@/interfaces/IUser";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/helpers/Fetch/FetchUsers";
import { updateUserRol } from "@/helpers/Fetch/FetchUsers";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Swal from "sweetalert2";

export default function Clientes() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<IUsuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8); // Usuarios por página
  const [hasMore, setHasMore] = useState(true); // Para controlar si hay más usuarios en páginas siguientes
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async (page:number, limit:number) => {
      try { 
        if (!session?.user.accessToken) {
            console.error('El token de acceso no está disponible.');
            return; // Detener la ejecución
          }
        const dataUsers = await fetchAllUsers(page, limit,session.user.accessToken);
        if (Array.isArray(dataUsers)) {
          // Filtrar solo los usuarios con rol 'cliente'
          const clientes = dataUsers.filter(usuarios => usuarios.rol === "cliente");
          setAllUsers(clientes);
          setHasMore(clientes.length === limit); // Si devuelve menos del límite, no hay más usuarios
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
  }, [currentPage, limit, session?.user.accessToken]);

  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleAssignAdminRole = async (nombre: string, id: string) => {
    if (!session?.user.accessToken) {
      console.error("El token de acceso no está disponible.");
      return;
    }

    try {
      // Confirmación con Swal
      const result = await Swal.fire({
      title: `¿Estás seguro de que quieres cambiar el rol a Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cambiar rol a Admin",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'bg-accent text-white',
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
      const updatedUser = await updateUserRol(id, "admin", session.user.accessToken);
      console.log("Usuario actualizado:", updatedUser);

     await Swal.fire({
        title: "Éxito",
        text: `El rol del usuario ${nombre} se cambio correctamente a Admin.`,
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
      })
      // Actualizar el estado local para reflejar el cambio
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, rol: updatedUser.rol } : user
        )
      )}
    } catch (error) {
      console.error("Error al asignar rol admin:", error);

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
            popup.style.backgroundColor = '#333'; // Fondo oscuro
            popup.style.color = 'white'; // Texto blanco
          }}
      });
    }
  };


  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-3xl font-bold">CLIENTES</h1>

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
            <button
            className={styles.editButton}
            onClick={() => router.push(
           `/admin/usuarios/crearProfesor/${usuario.id}`)}
                >
              Crear Profesor
         </button>
         <button
            className={styles.assignButton}
             onClick={() => handleAssignAdminRole(usuario.nombre ,usuario.id)}
              disabled={usuario.rol === "admin"} // Deshabilitar si ya es admin
            >
              Asignar Rol Admin
            </button>
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
