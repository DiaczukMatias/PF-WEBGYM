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
      const token = session?.user?.accessToken;
      if (token) {
        try {
          const membresiasActivas: IMembresia[] = await obtenerMembresias();
          const membresiasInactivas: IMembresia[] = await obtenerMembresiasInactivas(token);
          
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

  