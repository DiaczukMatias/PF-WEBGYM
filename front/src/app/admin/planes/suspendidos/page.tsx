"use client"
import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
import { obtenerMembresiasInactivas } from "@/helpers/Fetch/FetchMembresias";
import { useEffect, useState } from "react";
import { IMembresia } from "@/interfaces/IMembresia";
import { useSession } from "next-auth/react";


const PlanesSuspendidos:React.FC  =  () => {
  const [membresias, setMembresias] = useState<IMembresia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  useEffect(() => { 
  
    if (session?.user.accessToken) {
      const fetchMembresias = async () => {
        if (!session?.user.accessToken) {
          console.error('El token de acceso no está disponible.');
          setLoading(false);
          return; // Detener la ejecución
        }
        try {
          const data = await obtenerMembresiasInactivas(session.user.accessToken);  // Obtener los datos
          setMembresias(data);  // Actualizar el estado con los datos obtenidos
        } catch (error) {
          console.error("Error al obtener las membresías:", error);
        } finally {
          setLoading(false);  // Finalizar la carga
        }
      };
      fetchMembresias();  // Ejecutar la función
    }
  }, []);  // Solo ejecutar al montar el componente

  // Renderizar el componente PlanesView solo cuando los datos estén cargados
  if (loading) {
    return <div>Cargando...</div>;
  }
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes suspendidos</h1>
        <PlanesView fetchPlanes={membresias}/>
      </div>
    );
  }

  export default PlanesSuspendidos;
  