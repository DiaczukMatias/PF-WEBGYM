"use client";
import { IUsuario } from "@/interfaces/IUser";
import styles from "@/app/admin/usuarios/activos/ProfileView.module.css"
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/helpers/Fetch/FetchUsers";
import { useSession } from 'next-auth/react';
import Swal from "sweetalert2";
import { cancelarMembresia } from "@/helpers/Fetch/FetchMembresias";
import { renovarMembresia } from "@/helpers/Fetch/FetchMembresias";

export default function UsuariosConMembresia() {
  
  const [usersMember, setUsersMember] = useState<IUsuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState<number>(8); // Usuarios por página
  const { data: session } = useSession();
  const [hasMore, setHasMore] = useState(true); // Para controlar si hay más usuarios en páginas siguientes

   const fetchUsersMember = async (page:number, limit:number,) => {
      try {
        if (!session?.user.accessToken) {
            console.error('El token de acceso no está disponible.');
            return; // Detener la ejecución
          }
        const dataUsers = await fetchAllUsers(page, limit, session.user.accessToken );
        if (Array.isArray(dataUsers)) {
          setUsersMember(dataUsers.filter((usuario)  => usuario.membresia));
          setHasMore(dataUsers.length === limit); // Si devuelve menos del límite, no hay más usuarios
        } else {
          console.error("La respuesta no tiene el formato esperado:", dataUsers);
          setUsersMember([]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setUsersMember([]);
      }
    };

    useEffect(() => {
      fetchUsersMember(currentPage, limit);
    }, [currentPage, limit]);


  // Funciones para cambiar de página
  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  

const handleCancelarMembresia = async (usuario: IUsuario) => {
    if (!usuario.membresia?.id) {
      return;
    }
  
    try {
      if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        return; // Detener la ejecución
      }
      await cancelarMembresia( usuario.membresia.id, session?.user.accessToken); // Ahora estamos seguros de que `id` es un string
      fetchUsersMember(currentPage, limit); // Refresca la los usuarios con membresia
     
      Swal.fire({
        title: "Éxito",
        text: `La membresia ${usuario.membresia.nombre} del usuario ${usuario.nombre} ha sido suspendida correctamente.`,
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleRenovarMembresia = async (usuario: IUsuario) => {
    if (!session?.user?.id) return;

    try {
     if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        return; // Detener la ejecución
      }
      await renovarMembresia(usuario.id);
      fetchUsersMember(currentPage, limit); // Refresca la los usuarios con membresia
      Swal.fire({
        title: "Éxito",
        text: `La membresia ${usuario.membresia?.nombre} del usuario ${usuario.nombre} ha sido renovada correctamente.`,
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
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">

      <div className={styles.gridContainer}>
  {usersMember.map((usuario) => (
    <div key={usuario.id} className={styles.card}>
      <h4 className={styles.userName}>{usuario.membresia?.nombre.toUpperCase()}</h4>
      <div className={styles.userDetails}>
      <p>Fecha de Compra: {usuario.membresia?.fechaCreacion ? new Date(usuario.membresia.fechaCreacion).toLocaleDateString() : "No disponible"}</p>
      <p>Fecha de vencimiento: {usuario.membresia?.fechaExpiracion ? new Date(usuario.membresia.fechaExpiracion).toLocaleDateString() : "No disponible"}</p>
      <p>Fecha de actualizacion: {usuario.membresia?.fechaActualizacion ? new Date(usuario.membresia.fechaActualizacion).toLocaleDateString() : "Sin actualización"}</p>
        <p> Precio: {usuario.membresia?.precio} </p>
      </div>

      <h4 className={styles.userName}>{usuario.nombre.toUpperCase()}</h4>
      <div className={styles.userDetails}>
        <p>Telefono: {usuario.telefono ?? "Sin teléfono"}</p>
        <p>Email: {usuario.email}</p>
        <p>Edad: {usuario.edad ?? "Edad no especificada"}</p>
        <p> Rol: {usuario.rol} </p>
      </div>
   <button
              className="submitButtonSuspend m-4"
              onClick={() => handleCancelarMembresia(usuario)} // Pasar usuario explícitamente
            >
              Suspender Membresía
            </button>
            <button
              className="submitButton submitButton:hover m-4"
              onClick={() => handleRenovarMembresia(usuario)} // Pasar usuario explícitamente
            >
              Renovar Membresía
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
