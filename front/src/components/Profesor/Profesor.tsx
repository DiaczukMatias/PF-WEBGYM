"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IProfesor } from "@/interfaces/IProfesor";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProfesorProps {
  profesores: IProfesor[];
  itemsPerPage: number;  // Número de items visibles a la vez
  limit?: number;         // Total de items a mostrar
}

const Profesores: React.FC<ProfesorProps> = ({ profesores, itemsPerPage, limit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Limita la cantidad de profesores mostrados si `limit` está definido
  const displayedProfesores = limit ? profesores.slice(0, limit) : profesores;

  // Manejo del scroll izquierdo
  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Manejo del scroll derecho
  const handleScrollRight = () => {
    setCurrentIndex((prev) => 
      Math.min(prev + 1, displayedProfesores.length - itemsPerPage)
    );
  };

  // Calcula el margen izquierdo para centrar los items
  const calculateOffset = () => {
    const remainingItems = itemsPerPage - displayedProfesores.length;
    if (remainingItems > 0) {
      return (remainingItems * (100 / itemsPerPage)) / 2;
    }
    return 0;
  };

  const normalizeName = (name: string) =>
    name
      .toLowerCase()
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, ''); // Elimina todos los espacios

  return (
    <div className="relative m-4 p-4">
      <div className="flex items-center justify-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll left"
        >
          <FaChevronLeft size={20} color="white" />
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
              marginLeft: `${calculateOffset()}%`,
            }}
          >
            {displayedProfesores.map((profesor) => (
              <div
                key={profesor.id}
                className="flex-none w-full flex flex-col items-center border-b-2 border-accent"
                style={{ width: `${100 / itemsPerPage}%`, marginLeft: "1rem", marginRight: "1rem"}} // Ancho dinámico basado en itemsPerPage
              >
                <a href={`/clases`} className="text-center">
                  {profesor.imagen ? (
                    <Image
                      src={ `/images/profesor/${normalizeName(profesor.nombre)}.png`}
                      alt={profesor.nombre}
                      width={300}
                      height={400}
                      className="max-w-full sm:max-h-56 md:max-h-72 lg:max-h-80 rounded-lg object-cover"
                    />
                  ) : (
                    <p>Imagen no disponible</p>
                  )}
                  {profesor.clases && profesor.clases.length > 0 && (
                    <h4 className="flex justify-start text-center mt-3 text-sm text-accent fontOswaldSans-serif">
                      {profesor.clases[0].nombre.toUpperCase()} COACH
                    </h4>
                  )}
                  <h5 className="flex justify-start text-center mt-2 mb-4 text-xl font-semibold fontOswaldSans-serif">
                    {profesor.nombre.toUpperCase()}
                  </h5>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll right"
        >
          <FaChevronRight size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Profesores;
