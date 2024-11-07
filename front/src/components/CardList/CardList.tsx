'use client';

import React from 'react';
import Image from 'next/image';
import { IClase } from '@/interfaces/IClase';

interface ClassCardListProps {
  classes: IClase[];
  limit?: number; // Prop opcional para limitar el número de clases
}

const ClassCardList: React.FC<ClassCardListProps> = ({ classes, limit }) => {


  // Si 'limit' está definido, limita el número de clases, de lo contrario muestra todas
  const displayedClasses = limit ? classes.slice(0, limit) : classes;

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center">
        {displayedClasses.map((clase) => (
          <div
            key={clase.id}
            className="flex-none max-w-2/3 sm:max-w-2/3 md:max-w-2/3 lg:w-1/3 lg:max-w-64 xl:w-1/3 xl:max-w-64 p-2 m-2"
          >
            <a href={`/clases/${clase.categorias?.nombre}/${clase.nombre}`}>
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
    </div>
  );
};

export default ClassCardList;