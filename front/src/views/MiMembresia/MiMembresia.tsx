"use client"
import React, { useState, useEffect } from "react";
import { fetchUserById } from "@/helpers/Fetch/FetchUsers";
import { IMembresia } from "@/interfaces/IMembresia";
import { useSession } from "next-auth/react";
import styles from "@/views/MiMembresia/MiMembresia.module.css";


const MiMembresiaView: React.FC = () => {
  const [membresia, setMembresia] = useState<IMembresia | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchMembresiaActiva = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      if (!session?.user.id) {
        console.error('inicie sesion');
        return; 
      }
      const userData = await fetchUserById(session?.user.id);
      const membresiaData = userData.membresia 
      if (!membresiaData) {
        // Si no hay membresía activa, simplemente no establezcas un error
        setMembresia(null);
      } else {
        setMembresia(membresiaData);
      }
    } catch (err) {
      setError("Error al obtener la membresía activa.");
      console.error("Error al obtener la membresía activa.",err);
    } finally {
      setLoading(false);
    }
  };

  /*const handleCancelarMembresia = async () => {
    if (!membresia?.id) {
      setError("No se puede cancelar la membresía porque falta el ID.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        return; // Detener la ejecución
      }
      await cancelarMembresia( membresia.id, session?.user.accessToken); // Ahora estamos seguros de que `id` es un string
      setMembresia(null); // Elimina la membresía activa tras cancelarla
    } catch (err) {
      setError("Error al cancelar la membresía.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };*/
   /*
  const handleRenovarMembresia = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
   /*   if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        return; // Detener la ejecución
      }
      const usuarioId = session.user.id;
      await renovarMembresia(usuarioId);
      fetchMembresiaActiva(); // Refresca la membresía tras renovarla
    } catch (err) {
      setError("Error al renovar la membresía.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };*/

  useEffect(() => {
    fetchMembresiaActiva();
  }, [session]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>MI </span>
        <span className={styles.greenText}>  MEMBRESÍA</span>
      </h2>

      {loading && <p className="text-2xl text-white flex justify-center text-center m-4">Cargando...</p>}
      {error && <p className="text-2xl text-white flex justify-center text-center m-4">{error}</p>}

      {membresia ? (
        <div className={styles.card}>
          <h3 className={styles.titu}>{membresia.nombre.toUpperCase()}</h3>
          <p className={styles.cardDescription}>{membresia.descripcion || "Sin descripción"}</p>

          <div className={styles.features}>
          <div className={styles.planContainer}>
                      <h3 className={styles.planTitle}>Características</h3>
         </div>
            <ul className={styles.cardFeatures}>
              {membresia.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={styles.details}>
            <p  className={styles.price}>
              <strong>Precio:</strong> ${membresia.precio}
            </p>
            <p  className={styles.cardFeatures}>
              <strong>Duración:</strong> {membresia.duracionEnMeses || "No especificado"} meses
            </p>
            <p  className={styles.cardFeatures}>
              <strong>Fecha de creación:</strong> {new Date(membresia.fechaCreacion || "").toLocaleDateString()}
            </p>
            <p  className={styles.cardFeatures}>
              <strong>Fecha de expiración:</strong> {new Date(membresia.fechaExpiracion || "").toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 mb-4">
          {/*  <button
              className="submitButtonSuspend m-4"
              onClick={handleCancelarMembresia}
              disabled={loading}
            >
              Cancelar Membresía
            </button>
            <button
              className="submitButton submitButton:hover m-4"
              onClick={handleRenovarMembresia}
              disabled={loading}
            >
              Renovar Membresía
            </button>*/}
          </div>
        </div>
      ) : (
        <div className=" flex justify-center items-center">
        <p className="text-2xl text-white flex justify-center text-center m-4">
          No tienes una membresía activa en este momento.
        </p>
         <button
         className="text-2xl fles justify-center items-center border rounded border-white p-4 m-4"
         onClick={() => (window.location.href = `/planes`)}
       >
         Ver Planes
       </button>
       </div>
      )}
    </div>
  );
};

export default MiMembresiaView;
