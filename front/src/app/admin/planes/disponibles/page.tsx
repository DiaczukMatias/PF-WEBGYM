import PlanesView from "@/views/Planes/PlanesView";


export default function PlanesDisponibles
() {
    return (
      <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-3xl font-bold">Planes disponibles:</h1>
         <PlanesView/>

      </div>
    );
  }
  



/*
"use client"
import React, { useEffect, useState } from "react";
import PlanesView from "@/views/Planes/PlanesView";
import { obtenerMembresias, obtenerMembresiasInactivas } from "@/helpers/Fetch/FetchMembresias";
import { IMembresia } from "@/interfaces/IMembresia";
import { useSession } from "next-auth/react";


const PlanesDisponibles: React.FC = () => {
  const [membresias, setMembresias] = useState<IMembresia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();


  useEffect(() => {
    const fetchMembresias = async () => {

  if (!session?.user.accessToken) {
    console.error("No se encontró token de autorización", session?.user.accessToken);
    return null;
  }
      if (session.user.accessToken) {
        try {
          const membresiasActivas: IMembresia[] = await obtenerMembresias();
          const membresiasInactivas: IMembresia[] = await obtenerMembresiasInactivas(session.user.accessToken);
          
          // Filtra las membresías activas excluyendo las inactivas
          const filteredMembresias = membresiasActivas.filter((membresia: IMembresia) =>
            !membresiasInactivas.some((inactiva: IMembresia) => inactiva.id === membresia.id)
          );
          
          setMembresias(filteredMembresias);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener las membresías:", error);
          setLoading(false);
        }
      }
    };

    fetchMembresias();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">Cargando planes...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-3xl font-bold">Gestión de los planes</h1>
      <PlanesView fetchPlanes={membresias} />
    </div>
  );
};

export default PlanesDisponibles;

  */