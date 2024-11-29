import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
import { obtenerMembresias } from "@/helpers/Fetch/FetchMembresias";

const planes:React.FC  = async () => {

    const fetchFunction= await obtenerMembresias();

  return (
    <div>
       <PlanesView fetchPlanes={fetchFunction}/>
       </div>
  );
};

export default planes;
