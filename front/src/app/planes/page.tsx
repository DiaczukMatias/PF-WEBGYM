import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
// importar fet todos los planes


const planes:React.FC  = () => {

    //const fetchFunction= pasarle el fetch planes;

  return (
    <div>
       <PlanesView /*fetchPlanes={fetchFunction}*//>
       </div>
  );
};

export default planes;
