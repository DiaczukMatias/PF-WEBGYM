'use client';

import React from 'react';
import Image from 'next/image';
import { IClase } from '@/interfaces/IClase';
import { useRouter } from 'next/navigation'; // Importa el hook useRouter de Next.js para la redirección programática

interface ClassCardListProps {
  classes: IClase[];
}

const ClassCardList: React.FC<ClassCardListProps> = ({ classes }) => {
  const router = useRouter(); // Inicializa el router

  // Función para manejar la redirección al hacer clic en el botón
  const handleSeeMoreClick = () => {
    router.push('/clases'); // Redirige al usuario a la página /clases
  };

  return (
    <div>
      <h2 className="flex justify-center font-bold font-sans text-xl text-accent m-4">CLASES FAVORITAS:</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {classes.slice(0, 3).map((clase) => (
          <div
            key={clase.id}
            className="flex-none max-w-2/3 sm:max-w-2/3 md:max-w-2/3 lg:w-1/3 lg:max-w-64 xl:w-1/3 xl:max-w-64 p-2 m-2" // Asegura que en pantallas medianas y pequeñas ocupen todo el ancho
          > 
          <a href={`/clases/${clase.categorias?.nombre}/${clase.nombre}`} >  
            <div className="border rounded-lg overflow-hidden shadow-md border-accent">
              {clase.imagen && (
                
                     <Image
                  src={clase.imagen}
                  alt={clase.nombre}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover"
                  />
               
              )}
              <div className="p-4">
                <h3 className="text-xl text-accent font-semibold">{clase.nombre}</h3>
                <p className="text-sm text-secondary mt-1">{clase.categorias?.nombre.toUpperCase()}</p>
              </div>
            </div>
             </a>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button 
          onClick={handleSeeMoreClick} 
          className="border border-accent text-accent px-4 py-2 rounded-lg"
        >
          Ver más clases
        </button>
      </div>
    </div>
  );
};

export default ClassCardList;
