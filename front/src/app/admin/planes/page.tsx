"use client"; // Asegura que este archivo se ejecute solo en el cliente

import React, { useEffect, useState } from "react";
import PlanesView from "@/views/Planes/PlanesView";
import { obtenerMembresias } from "@/helpers/Fetch/FetchMembresias";

const PlanesPage: React.FC = () => {
  const [fetchFunction, setFetchFunction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerMembresias();
        setFetchFunction(data);
      } catch (err) {
        console.error("Error al obtener membresías:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-2xl font-bold">Gestión de Planes</h1>
      <PlanesView fetchPlanes={fetchFunction} />
    </div>
  );
};

export default PlanesPage;
