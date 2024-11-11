"use client";

import React from "react";
import ClassCardList from "@/components/CardList/CardList";
import Category from "@/components/Categories/Categories";
import Profesores from "@/components/Profesor/Profesor";
import Carrusel from "@/components/Carrusel.tsx/Carrusel";
import {
  categoriesData,
  clasesData,
  profesoresData,
} from "@/helpers/datatemporal";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

// eliminar datatemporal y hacer conexion con back

const HomeView = () => {
  const router = useRouter();

  const handleSeeMoreClick = () => {
    router.push("/clases");
  };

  const categorias = categoriesData.map((categoria) => ({
    nombre: categoria.nombre,
    imagen: `/images/categories/${categoria.nombre}.png`,
  }));

  return (
    <div>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>Nuestros</span>
        <span className={styles.greenText}>Programas</span>
      </h2>
      <Carrusel categorias={categorias} />
      <Category categories={categoriesData} />

      <div className={styles.container}>
        <ClassCardList classes={clasesData} limit={3} />
        <div className={styles.buttonContainer}>
          <button onClick={handleSeeMoreClick}>Ver más clases</button>
        </div>
      </div>

      <Profesores profesores={profesoresData} />
    </div>
  );
};

export default HomeView;
