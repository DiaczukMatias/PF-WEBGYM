import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
// importar fet todos los planes


export default function PlanesPage() {

      //const fetchFunction= pasarle el fetch planes;

    return (
        <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">Gestión de Planes</h1>
        <PlanesView /*fetchPlanes={fetchFunction}*//>
        </div>
    );
  }
  