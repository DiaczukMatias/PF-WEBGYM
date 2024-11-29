import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
// importar fet todos los planes


export default function PlanesSuspendidos() {

      //const fetchFunction= pasarle el fetch planes;

    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes suspendidos</h1>
        <PlanesView /*fetchPlanes={fetchFunction}*//>
      </div>
    );
  }
  