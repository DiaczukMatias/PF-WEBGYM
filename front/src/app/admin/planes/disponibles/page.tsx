import React from "react";
import PlanesView from "@/views/Planes/PlanesView";
import { obtenerMembresias, obtenerMembresiasInactivas } from "@/helpers/Fetch/FetchMembresias";
import { IMembresia } from "@/interfaces/IMembresia";

const PlanesDisponibles: React.FC = async () => {
  try {
    const membresiasActivas: IMembresia[] = await obtenerMembresias();
    const membresiasInactivas: IMembresia[] = await obtenerMembresiasInactivas();
    // Filtra las membresías activas excluyendo las suspendidas
    const fetchPlanes =  membresiasActivas.filter((membresias: IMembresia) => 
      !membresiasInactivas.some((membresias: IMembresia) => membresias.id === membresias.id)
    );


    return (
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes</h1>
        <PlanesView fetchPlanes={fetchPlanes} />
      </div>
    );
  } catch (error) {
    console.error("Error al obtener las membresías:", error);
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">Error al cargar los planes</h1>
        <p>Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }
};

export default PlanesDisponibles;
