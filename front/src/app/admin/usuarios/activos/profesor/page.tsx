"use client";
import { IPerfilProfesor } from "@/interfaces/IProfesor";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import { fetchPerfilProfesores } from "@/helpers/Fetch/FetchProfesores";
import { useRouter } from "next/navigation";

export default function Profesres() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<IPerfilProfesor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5); // Usuarios por página
  const [hasMore, setHasMore] = useState(true); // Para controlar si hay más usuarios en páginas siguientes

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const profesor = await fetchPerfilProfesores();
        if (Array.isArray(profesor)) {
          // Filtrar solo los usuarios con rol 'cliente'
          setAllUsers(profesor);
          console.log("profesores:",profesor)
          setHasMore(profesor.length === limit); // Si devuelve menos del límite, no hay más usuarios
        } else {
          console.error("La respuesta no tiene el formato esperado:", profesor);
          setAllUsers([]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setAllUsers([]);
      }
    };

    fetchAllUsers();
  }, []);

  // Funciones para cambiar de página
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
        {allUsers.map((usuario) => (
          <div key={usuario.id} className={styles.card}>
            <h4 className={styles.userName}>{usuario.nombre.toUpperCase()}</h4>
         {/*   <div className={styles.profilePictureContainer}>
          <img src={usuario.imagen ?? "/images/profesor/jessicaroberts.png"} alt="Profile" className={styles.profilePicture} />
        </div>*/}
            <div className={styles.userDetails}>
              <p> Certificacion:  {usuario.certificacion ?? "sin certificacion"}</p>
              <p> Descripcion:  {usuario.descripcion}</p>
            </div>
           {/* <button
              className={styles.editButton}
              onClick={() => router.push(`/editar-usuario/${usuario.id}`)}
            >
              Editar Perfil
            </button>*/}
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
