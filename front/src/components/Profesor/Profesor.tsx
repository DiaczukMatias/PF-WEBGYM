"use client";

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
