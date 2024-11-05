
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IProfesor } from '@/interfaces/IProfesor';

interface ProfesorProps {
  profesores: IProfesor[];  // Recibe las categorías como prop
}

const Profesores: React.FC<ProfesorProps> = ({ profesores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, profesores.length - itemsPerPage));
  };

  return (
    <div className="relative">
      <h2 className="flex justify-start font-extrabold font-sans text-xl text-accent m-4">PROFESORES:</h2>
      <h3 className='flex justify-center font-normal text-secondary2 m-4'> Conoce nuestros instructores certificados enfocados en ofrecerte las mejores disciplinas para tu bienestar integral.</h3>
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Scroll left"
        >
          <div className="border-l-4 border-t-4 border-transparent border-l-black border-t-transparent w-0 h-0 transform rotate-135" />
        </button>
        <div className="overflow-hidden w-full">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {profesores.map((profesor) => (
              <div key={profesor.id} className="flex-none w-1/8 mx-1 flex flex-col items-center">
                <a href={`/clases/${profesor.nombre}`} className="text-center">
                  <Image
                    src={profesor.imagen}  // Imagen en `public/images/profesor/`
                    alt={profesor.nombre}
                    width={150}  
                    height={150}
                    className="h-24 w-24 max-w-full border-4 border-accent rounded-full object-cover lg:h-48 lg:w-48"
                  />
                  <h5 className="flex justify-center mt-1 text-sm">{profesor.nombre}</h5>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Scroll right"
        >
          <div className="border-r-4 border-b-4 border-transparent border-r-black border-b-transparent w-0 h-0 transform rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default Profesores;
