"use client";

import React, { useEffect, useState } from "react";
import ClassCardList from "@/components/CardList/CardList";
import Category from "@/components/Categories/Categories";
import Profesores from "@/components/Profesor/Profesor";
import Carrusel from "@/components/Carrusel.tsx/Carrusel";
import {
  clasesData,
  profesoresData,
  categoriesData,
} from "@/helpers/datatemporalClases";
import { fetchClases } from "@/helpers/Fetch/FetchClases";
import { getCategoriesActivas } from "@/helpers/Fetch/FetchCategorias";
import { fetchPerfilProfesores } from '@/helpers/Fetch/FetchProfesores';
//import { fetchProfesoresConClases } from "@/helpers/Fetch/FetchProfesores";
import styles from "@/views/Home/Home.module.css";

//import { IPerfilProfesor } from '@/inte//rfaces/IProfesor';

const HomeView = () => {
  // Cambia el valor de `useBackend` a `true` para usar el backend o a `false` para usar los datos temporales
  const [useBackend] = useState(true);

  const [clases, setClases] = useState(clasesData);
  const [categorias, setCategorias] = useState(categoriesData);
  const [profesores, setProfesores] = useState(profesoresData); // Para almacenar los profesores


  useEffect(() => {
    const fetchData = async () => {
      if (useBackend) {
        // Si `useBackend` es true, se obtienen los datos del backend
        try {
          const fetchedClases = await fetchClases();
          const fetchedCategorias = await getCategoriesActivas();
          const fetchedProfesores = await fetchPerfilProfesores(); // Llamar a la función para obtener los profesores

          setClases(fetchedClases);
          setCategorias(fetchedCategorias);
          setProfesores(fetchedProfesores);

        } catch (error) {
          console.error("Error al obtener datos del backend:", error);
        }
      } else {
        // Si `useBackend` es false, se usan los datos temporales
        setClases(clasesData);
        setCategorias(categoriesData);
        setProfesores(profesoresData);
      }
    };
    fetchData();
  }, [useBackend]); // Se ejecuta cuando `useBackend` cambia

  const normalizeName = (name: string) =>
    name
      .toLowerCase()
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/ú/g, "u")
      .replace(/ñ/g, "n");

  const mappedCategorias = categorias
    .filter((categoria) => categoria.nombre) // Filtra categorías sin nombre
    .map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      imagen: categoria.imagen ||`/images/categories/${normalizeName(categoria.nombre)}.png`, // Genera la ruta de imagen directamente
    }));

  const handleSeeMoreClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/clases";
    }
  };


  return (
    <div>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>Nuestros</span>
        <span className={styles.greenText}>Programas</span>
      </h2>
      <Carrusel categorias={mappedCategorias} />
      <Category categories={categorias} />

      <div className={styles.titleTwo}>
        <span className={styles.whiteText}>NUESTRAS</span>
        <span className={styles.greenText}> CLASES MÁS POPULARES</span>
      </div>
      <div className={styles.container}>
        <ClassCardList classes={clases} limit={3} />
        <div className={styles.buttonContainer}>
          <button onClick={handleSeeMoreClick} className={styles.newButton}>
            VER MAS CLASES
          </button>
        </div>
      </div>
      <div className={styles.title3}>
        <span className={styles.whiteText}>NUESTROs</span>
        <span className={styles.greenText}>MEJORES ENTRENADORES</span>
      </div>
      <Profesores profesores={profesores} limit={6} itemsPerPage={3} />
    </div>
  );
};

export default HomeView;
