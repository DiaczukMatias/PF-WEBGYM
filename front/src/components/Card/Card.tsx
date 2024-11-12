// src/components/Card/Card.tsx

import React from 'react';
import Image from 'next/image';
import { IClase } from '../../interfaces/IClase';

interface ClassCardProps {
  clase: IClase;  
}

const ClassCard: React.FC<ClassCardProps> = ({ clase }) => {
  const { nombre, descripcion, fecha, imagen, categoria, perfilProfesor, disponibilidad} = clase;
  console.log('clase card:', clase);

  const formattedHorario = new Date(fecha).toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex max-w-full min-h-80 rounded-lg overflow-hidden shadow-lg border border-accent">
    <div className='w-1/2'>
      {imagen && (
        <Image 
          src={imagen} 
          alt={nombre} 
          width={350} 
          height={200} 
          className="w-full object-cover"
        />
      )}
      </div>
      
      <div className="p-4">
        <h3 className="text-center text-2xl font-semibold text-accent .fontOswaldSans-serif">{nombre.toUpperCase()}</h3>
        <p className="text-sm text-secondary2 mt-1">{categoria?.nombre}</p>
        <p className="text-sm text-secondary mt-2">Profesor:{perfilProfesor?.nombre} </p>
        <p className="text-sm text-secondary2 mt-2">{descripcion}</p>
        <p className="text-sm text-secondary2 mt-2">Fecha: {formattedHorario}</p>
        <p className="text-sm text-secondary2 mt-2">Cupos disponibles: {disponibilidad}</p>
      </div>
    </div>
  );
};

export default ClassCard;
