"use client";

import React from "react";
import { IClase } from "@/interfaces/IClase";
import styles from "./CardList.module.css"; 

interface ClassCardListProps {
  classes: IClase[];
  limit?: number;
}

const ClassCardList: React.FC<ClassCardListProps> = ({ classes, limit }) => {
  // Si 'limit' está definido, limita el número de clases, de lo contrario muestra todas
  const displayedClasses = limit ? classes.slice(0, limit) : classes;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.whiteText}>NUESTRAS</span>
        <span className={styles.greenText}> CLASES MÁS POPULARES</span>
      </div>

      <div className={styles.cardContainer}>
        {displayedClasses.slice(0, 3).map((clase) => (
          <div key={clase.id} className={styles.card}>
            <a href={`/clases/${clase.categoria?.nombre}/${clase.nombre}`}>
              <div>
                <div className={styles.statistic}>
                  85% de los estudiantes la eligen
                </div>
                <div className={styles.category}>
                  {clase.categoria?.nombre.toUpperCase()}
                </div>
                <div className={styles.description}>
                  {clase.descripcion ||
                    "Una clase para mejorar tu rendimiento y salud."}
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
