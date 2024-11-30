"use client";  // Asegura que este archivo se ejecute solo en el cliente

import React, { useEffect, useState } from "react";
import PlanesCard from "@/components/Planes/Planes";
import { IMembresia } from '@/interfaces/IMembresia';
import { obtenerMembresiasInactivas } from "@/helpers/Fetch/FetchMembresias";
import { useSession } from "next-auth/react";


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
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user.accessToken) {
          try {
            const data = await obtenerMembresiasInactivas(session.user.accessToken);  // Obtener los datos
            console.log("Datos obtenidos:", data);

            if (data.length === 0) {
              // Si el fetch falla o no hay datos, usa los datos temporales
              setMembresias(planesData);
              setUseBackend(false);
            } else {
              setMembresias(data);  // Si el fetch es exitoso, usar los datos obtenidos
              setUseBackend(true);
            }
          } catch (err) {
            console.error("Error al obtener las membresías:", err);
            setMembresias(planesData);  // Usar datos temporales si hay un error en el fetch
            setUseBackend(false);
          }
        } else {
          console.error('El token de acceso no está disponible.');
        }
      } catch (err) {
        console.error('Error en el bloque principal de fetchData:', err);
      }
    };

    fetchData();
  }, []);   // Ejecutar cuando la página o el límite cambien

  const mappedPlanes =  Array.isArray(membresias) ? membresias.map((membresia) => ({
    id: membresia.id,
    nombre: membresia.nombre,
    descripcion: membresia.descripcion,
    duracionEnMeses: membresia.duracionEnMeses,
    features: membresia.features,
    precio: membresia.precio,
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







/*"use client"
import PlanesView from "@/views/Planes/PlanesView";
import React from "react";
import { obtenerMembresiasInactivas } from "@/helpers/Fetch/FetchMembresias";
import { useEffect, useState } from "react";
import { IMembresia } from "@/interfaces/IMembresia";
import { useSession } from "next-auth/react";


const PlanesSuspendidos:React.FC  =  () => {
  const [membresias, setMembresias] = useState<IMembresia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  useEffect(() => { 
  
    if (session?.user.accessToken) {
      const fetchMembresias = async () => {
        if (!session?.user.accessToken) {
          console.error('El token de acceso no está disponible.');
          setLoading(false);
          return; 
        }
        try {
          const data = await obtenerMembresiasInactivas(session.user.accessToken);  // Obtener los datos
          setMembresias(data);  
        } catch (error) {
          console.error("Error al obtener las membresías:", error);
        } finally {
          setLoading(false);  
        }
      };
      fetchMembresias();  
    }
  }, []); 

 
  if (loading) {
    return <div>Cargando...</div>;
  }
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes suspendidos</h1>
        <PlanesView fetchPlanes={membresias}/>
      </div>
    );
  }

  export default PlanesSuspendidos;
  */