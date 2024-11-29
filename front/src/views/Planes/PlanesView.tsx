"use client"
import React, { useEffect, useState } from 'react';
import PlanesCard from "@/components/Planes/Plenes";


export const planesData = [
  {
    id: "1",
    nombre: "PRO PLAN",
    descripcion:
      "Nuestro Plan Pro ofrece entrenamientos avanzados y asesoramiento personalizado en nutrición para ayudarte a alcanzar tus objetivos más rápido. ¡Regístrate ahora!",
    features: [
      "Acceso a las clases grupales",
      "INscripsiones desde la web",
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
      "INscripsiones desde la web",
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
      "INscripsiones desde la web",
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


// Definir el tipo de la prop para aceptar distintas funciones de fetch
/*interface PlanesViewProps {
  fetchPlanes: () => Promise<any[]>;
}*/

const PlanesView: React.FC/*<PlanesViewProps>*/ = ({ /*fetchPlanes */}) => {
  // Cambia el valor de `useBackend` a `true` para usar el backend o a `false` para usar los datos temporales
  const [useBackend] = useState(true);

  const [membresia, setMembresias] = useState(planesData);
  
  useEffect(() => {
    const fetchData = async () => {
      if (useBackend) {
        // Si `useBackend` es true, se obtienen los datos del backend
        try {
        //  const fetchedPlanes = await fetchPlanes(); // Llama a la función fetch pasada como prop en el page
        //  setMembresias(fetchedPlanes);
   

       //   console.log("set planes:", setMembresia)

        } catch (error) {
          console.error('Error al obtener los planes del backend:', error);
        }
      } else {
        // Si `useBackend` es false, se usan los datos temporales
        setMembresias(planesData);
        
      }
    };
    fetchData();
  }, [useBackend]); // Se ejecuta cuando `useBackend` cambia

      const mappedPlanes = membresia
      .map((membresia) => ({
        id: membresia.id,
        nombre: membresia.nombre,
        descripcion: membresia.descripcion,
        features: membresia.features,
        precio: membresia.precio
      }));
    

  return (
    <div >
       <PlanesCard membresia={mappedPlanes}/>
    </div>
  );
};

export default PlanesView;
