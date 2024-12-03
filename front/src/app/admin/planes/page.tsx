"use client";  // Asegura que este archivo se ejecute solo en el cliente

import React, { useEffect, useState } from "react";
import PlanesCard from "@/components/Planes/Planes";
import { IMembresia } from '@/interfaces/IMembresia';
import { obtenerMembresias } from "@/helpers/Fetch/FetchMembresias";

// Datos temporales (fallback)
const planesData = [
  {
    id: "1",
    nombre: "PRO PLAN",
    descripcion:
      "Nuestro Plan Pro ofrece entrenamientos avanzados y asesoramiento personalizado en nutrición para ayudarte a alcanzar tus objetivos más rápido. ¡Regístrate ahora!",
    features: [
      "Acceso a las clases grupales",
      "Inscripciones desde la web",
      "Seguimiento de progreso",
      "Comunidad en línea de apoyo",
      "Planes de entrenamiento avanzados y personalizados",
      "Asesoramiento completo en nutrición",
      "Acceso a programas de entrenamiento avanzados",
      "Análisis de composición corporal",
    ],
    precio: 99,
  },
  {
    id: "2",
    nombre: "PLAN BÁSICO",
    descripcion:
      "Nuestro Plan Básico es perfecto para aquellos que desean comenzar con el fitness, ofreciendo una forma simple y asequible de entrenar regularmente.",
    features: [
      "Acceso a las clases grupales",
      "Inscripciones desde la web",
      "Seguimiento de progreso",
      "Soporte de la comunidad",
      "Consejos básicos de nutrición",
      "Actualizaciones por correo electrónico semanales",
      "Acceso a desafíos grupales",
      "Revisiones mensuales de estado físico",
    ],
    precio: 19,
    duracionEnMeses: 6,
  },
  {
    id: "3",
    nombre: "PLAN CUSTOMIZADO",
    descripcion:
      "Crea tu propio plan personalizado según tus necesidades específicas. Perfecto para quienes desean un enfoque más personalizado en el fitness y la nutrición.",
    features: [
      "Acceso a las clases grupales",
      "Inscripciones desde la web",
      "Asesoramiento nutricional personalizado",
      "Seguimiento de progreso personalizado",
      "Sesiones de coaching uno a uno",
      "Desafíos de fitness personalizados",
      "Acceso a recursos premium",
      "Técnicas avanzadas de recuperación",
    ],
    precio: 59,
  },
];

const PlanesPage: React.FC = () => {
  const [membresias, setMembresias] = useState<IMembresia[]>([]);  // Estado para las membresías
  const [useBackend, setUseBackend] = useState(true);  // Estado para controlar el uso de datos temporales o backend
  const [page] = useState<number>(1);  // Página de las membresías
  const [limit] = useState<number>(3);  // Límite de membresías por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Intentar obtener los datos desde el backend
        const data = await obtenerMembresias(page, limit);
        console.log("Datos obtenidos:", data); 
        
        if (data.length === 0) {
          // Si el fetch falla o no hay datos, usa los datos temporales
          setMembresias(planesData);
          setUseBackend(false);
        } else {
          setMembresias(data.data.filter((membresia: IMembresia)=> membresia.activa));  // Si el fetch es exitoso, usar los datos obtenidos
          setUseBackend(true);
        }
      } catch (err) {
        console.error("Error al obtener las membresías:", err);
        setMembresias(planesData);  // Usar datos temporales si hay un error en el fetch
        setUseBackend(false);
      }
    };

    fetchData();
  }, [page, limit]);  // Ejecutar cuando la página o el límite cambien

  const mappedPlanes =  Array.isArray(membresias) ? membresias.map((membresia) => ({
    id: membresia.id,
    nombre: membresia.nombre,
    descripcion: membresia.descripcion,
    duracionEnMeses: membresia.duracionEnMeses,
    features: membresia.features,
    precio: membresia.precio,
    activa: membresia.activa
  })):  [];

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-accent text-2xl font-bold">Gestión de Planes</h1>
      <p>{useBackend ? "Datos del backend" : "Datos temporales"}</p>  {/* Mensaje de respaldo */}
      <PlanesCard membresia={mappedPlanes} />  {/* Mostrar los planes */}
    </div>
  );
};

export default PlanesPage;


