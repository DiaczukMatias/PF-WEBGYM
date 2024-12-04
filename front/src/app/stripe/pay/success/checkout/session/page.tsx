"use client";
import { useRouter } from "next/navigation";
import styles from "./mensaje.module.css";
import { useSession } from "next-auth/react";
import { comprarMembresia } from "@/helpers/Fetch/FetchMembresias";
import { useState, useEffect } from "react";
import { IMembresia } from "@/interfaces/IMembresia";

const SuccessPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [membresia, setMembresia] = useState<IMembresia>();

  useEffect(() => {
    // Recupera la membresía almacenada en localStorage al montar el componente
    const membresiaStorage = localStorage.getItem("membresia elegida:");
    if (membresiaStorage) {
      setMembresia(JSON.parse(membresiaStorage));
    }
  }, []);

  
  const handleRedirect = async () => {
    if (!session?.user.accessToken ) {
      console.error("El token de acceso no está disponible.");
      return; // Detener la ejecución
    }
    if (!membresia?.id ) {
      console.error("No se encontro el id de la membresia");
      return; // Detener la ejecución
    }
    await comprarMembresia(membresia.id , session.user.accessToken)
    router.push("/profile");
  };


return (
  <div className={styles.card}>
    <h1>¡Pago Exitoso!</h1>
    {membresia ? (
      <p>Tu pago de la membresía {membresia.nombre} fue procesado con éxito.</p>
    ) : (
      <p>Procesando los detalles de la membresía...</p>
    )}
    <button onClick={handleRedirect}>Ir al perfil</button>
  </div>
);}
export default SuccessPage;
