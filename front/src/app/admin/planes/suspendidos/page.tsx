import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
import { obtenerMembresiasInactivas } from "@/helpers/Fetch/FetchMembresias";


const PlanesSuspendidos:React.FC  = async () => {

     const fetchFunction= await obtenerMembresiasInactivas();

    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes suspendidos</h1>
        <PlanesView fetchPlanes={fetchFunction}/>
      </div>
    );
  }

  export default PlanesSuspendidos;
  