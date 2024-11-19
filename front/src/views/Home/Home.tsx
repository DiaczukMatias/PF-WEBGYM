'use client';

import React, { useEffect, useState } from 'react';
import ClassCardList from '@/components/CardList/CardList';
import Category from '@/components/Categories/Categories';
import Profesores from '@/components/Profesor/Profesor';
import Carrusel from '@/components/Carrusel.tsx/Carrusel';
import { clasesData, profesoresData, categoriesData } from '@/helpers/datatemporalClases';
import { fetchClases } from '@/helpers/Fetch/FetchClases';
import { getCategories } from '@/helpers/Fetch/FetchCategorias';
import styles from './Home.module.css';


const HomeView = () => {
  // Cambia el valor de `useBackend` a `true` para usar el backend o a `false` para usar los datos temporales
  const [useBackend] = useState(true);

  const [clases, setClases] = useState(clasesData); 
  const [categorias, setCategorias] = useState(categoriesData); 
  console.log('clases en el home ', clases);
  console.log('categorias en el home ', categorias);
  
  useEffect(() => {
    const fetchData = async () => {
      if (useBackend) {
        // Si `useBackend` es true, se obtienen los datos del backend
        try {
          const fetchedClases = await fetchClases();
          const fetchedCategorias = await getCategories();
          setClases(fetchedClases);
          setCategorias(fetchedCategorias);
          console.log("set clases home:", setClases)
        } catch (error) {
          console.error('Error al obtener datos del backend:', error);
        }
      } else {
        // Si `useBackend` es false, se usan los datos temporales
        setClases(clasesData);
        setCategorias(categoriesData);
      }
    };
    fetchData();
  }, [useBackend]); // Se ejecuta cuando `useBackend` cambia

  const mappedCategorias = categorias.map((categoria) => ({
    nombre: categoria.nombre,
    imagen: `/images/categories/${categoria.nombre.toLowerCase()}.png`,
  }));

  const handleSeeMoreClick = () => {
    window.location.href = '/clases';
  };
  console.log("clases del fetchdada home:", clases)

  return (
    <div>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>Nuestros</span>
        <span className={styles.greenText}>Programas</span>
      </h2>
      <Carrusel categorias={mappedCategorias} />
      <Category categories={categorias} />

      <div className={styles.title}>
        <span className={styles.whiteText}>NUESTRAS</span>
        <span className={styles.greenText}> CLASES MÁS POPULARES</span>
      </div>
      <div className={styles.container}>
        <ClassCardList classes={clases} limit={3} />
        <div className={styles.buttonContainer}>
          <button onClick={handleSeeMoreClick}>Ver más clases</button>
        </div>
      </div>
      <div className={styles.title}>
        <span className={styles.whiteText}>NUESTROs</span>
        <span className={styles.greenText}>MEJORES ENTRENADORES</span>
      </div>
      <Profesores profesores={profesoresData} limit={3} itemsPerPage={3} />
    </div>
  );
};

export default HomeView;


/*"use client";

import React from "react";
import ClassCardList from "@/components/CardList/CardList";
import Category from "@/components/Categories/Categories";
import Profesores from "@/components/Profesor/Profesor";
import Carrusel from "@/components/Carrusel.tsx/Carrusel";
import { clasesData, profesoresData, categoriesData } from "@/helpers/datatemporalClases";
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
     
      <div className={styles.title}>
        <span className={styles.whiteText}>NUESTRAS</span>
        <span className={styles.greenText}> CLASES MÁS POPULARES</span>
      </div>
      <div className={styles.container}>
        <ClassCardList classes={clasesData} limit={3} />
        <div className={styles.buttonContainer}>
          <button onClick={handleSeeMoreClick}>Ver más clases</button>
        </div>
      </div>
      <div className={styles.title}>
        <span className={styles.whiteText}>NUESTRoS</span>
        <span className={styles.greenText}>MEJORES ENTRENADORES</span>
      </div >
      <Profesores profesores={profesoresData} limit={3} itemsPerPage={3}/>
    </div>
  );
};

export default HomeView;
*/