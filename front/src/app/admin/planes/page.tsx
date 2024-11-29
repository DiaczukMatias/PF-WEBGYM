import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
import { obtenerMembresias } from "@/helpers/Fetch/FetchMembresias";


const PlanesPage:React.FC  = async () => {

  const fetchFunction= await obtenerMembresias();

    return (
        <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">Gestión de Planes</h1>
        <PlanesView fetchPlanes={fetchFunction}/>
        </div>
    );
  }

  export default PlanesPage;
  