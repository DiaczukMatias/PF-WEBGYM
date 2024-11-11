"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IProfesor } from "@/interfaces/IProfesor";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProfesorProps {
  profesores: IProfesor[]; 
}

const Profesores: React.FC<ProfesorProps> = ({ profesores }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) => 
      Math.min(prev + 1, profesores.length - itemsPerPage));
  };

  const calculateOffset = () => {
    if (profesores.length < itemsPerPage) {
      return (itemsPerPage - profesores.length) * (100 / itemsPerPage) / 2;
    }
    return 0;
  };

  return (
    <div className="relative m-4 p-4">
      <h2 className="flex justify-center font-bold font-sans text-xl text-accent m-4">PROFESORES:</h2>
   {  /*  <h3 className="flex justify-center font-normal text-secondary2 m-4">
        Conoce nuestros instructores certificados enfocados en ofrecerte las mejores disciplinas para tu bienestar integral.
      </h3> */ }
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll left"
        >
          <div className="flex items-center">
            <FaChevronLeft size={20} color="white" />
          </div>
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
              marginLeft: `${calculateOffset()}%`,
            }}
          >
            {profesores.map((profesor) => (
              <div key={profesor.id} 
                className="flex-none w-1/8 mx-2 flex flex-col items-center border-b-2 border-accent">
                  <a href={`/clases/${profesor.nombre}`} className="text-center">
                    <Image
                      src={profesor.imagen} 
                      alt={profesor.nombre}
                      width={150}
                      height={150}
                      className="h-24 w-24 max-w-full rounded-lg object-cover lg:h-48 lg:w-48"
                    />
                  {profesor.clases.length > 0 && (
                    <h4 className="flex justify-center mt-1 text-sm text-accent">
                      {profesor.clases[0].nombre.toUpperCase()}
                    </h4>
                  )}
                  <h5 className="flex justify-center mt-1 text-sm font-bold">
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
          <div className="flex items-center">
            <FaChevronRight size={20} color="white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profesores;


/*"use client";

import React from "react";
import Image from "next/image";
import { IProfesor } from "@/interfaces/IProfesor";
import styles from "./Profesor.module.css"; // Importa el archivo CSS

interface ProfesorProps {
  profesores: IProfesor[];
}

const Profesores: React.FC<ProfesorProps> = ({ profesores }) => {
  const profesoresLimitados = profesores.slice(0, 3);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>NUESTROS</span>
        <span className={styles.greenText}> MEJORES ENTRENADORES</span>
      </h2>

      <div className={styles.cardContainer}>
        {profesoresLimitados.map((profesor) => (
          <div key={profesor.id} className={styles.card}>
            <a href={`/clases/${profesor.nombre}`} className="text-center">
              <Image
                src={profesor.imagen}
                alt={profesor.nombre}
                width={200}
                height={200}
                className={styles.image}
              />
              {profesor.clases.length > 0 && (
                <h4 className={styles.cardClase}>
                  {profesor.clases[0].nombre.toUpperCase()}
                </h4>
              )}
              <h5 className={styles.cardName}>
                {profesor.nombre.toUpperCase()}
              </h5>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profesores;
*/