'use client';

import React from 'react';
import Image from 'next/image';
import { IClase } from '../../interfaces/IClase';

interface ClassCardProps {
  clase: IClase;  
}

const ClassCard: React.FC<ClassCardProps> = ({ clase }) => {
  const { nombre, descripcion, fecha, imagen, categoria, profesores } = clase;
  
  // Formateamos el horario de la clase
  const formattedHorario = new Date(fecha).toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg border border-accent ">
      {imagen && (
        <Image 
          src={imagen} 
          alt={nombre} 
          width={350} 
          height={200} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-accent">{nombre}</h3>
        <p className="text-sm text-gray-500 mt-1">{categoria?.nombre}</p> {/* Mostramos el nombre de la categoría */}
        <p className="text-sm text-gray-600 mt-2">Profesor: {profesores?.nombre}</p> {/* Mostramos el nombre del profesor */}
        <p className="text-sm text-gray-500 mt-2">{descripcion}</p>
        <p className="text-sm text-gray-400 mt-2">fecha: {formattedHorario}</p> {/* Mostramos el horario formateado */}
      </div>
    </div>
  );
};

export default ClassCard;
