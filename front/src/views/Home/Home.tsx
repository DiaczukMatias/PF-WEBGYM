'use client';

import React, { useEffect, useState } from 'react';
import ClassCardList from '@/components/CardList/CardList';
import Category from '@/components/Categories/Categories';
import Profesores from '@/components/Profesor/Profesor';
import Carrusel from '@/components/Carrusel.tsx/Carrusel';
import { clasesData, profesoresData, categoriesData } from '@/helpers/datatemporalClases';
import { fetchClases } from '@/helpers/Fetch/FetchClases';
import { getCategories } from '@/helpers/Fetch/FetchCategorias';
//import { fetchPerfilProfesores } from '@/helpers/Fetch/FetchProfesores';
import { fetchProfesoresConClases } from '@/helpers/Fetch/FetchProfesores';
import styles from './Home.module.css';
//import { IPerfilProfesor } from '@/inte//rfaces/IProfesor';


const HomeView = () => {
  // Cambia el valor de `useBackend` a `true` para usar el backend o a `false` para usar los datos temporales
  const [useBackend] = useState(true);

  const [clases, setClases] = useState(clasesData); 
  const [categorias, setCategorias] = useState(categoriesData); 
  const [profesores, setProfesores] = useState(profesoresData); // Para almacenar los profesores

  console.log('clases en el home ', clases);
  console.log('categorias en el home ', categorias);
  
  useEffect(() => {
    const fetchData = async () => {
      if (useBackend) {
        // Si `useBackend` es true, se obtienen los datos del backend
        try {
          const fetchedClases = await fetchClases();
          const fetchedCategorias = await getCategories();
          const fetchedProfesores = await fetchProfesoresConClases(); // Llamar a la función para obtener los profesores

          setClases(fetchedClases);
          setCategorias(fetchedCategorias);
          setProfesores(fetchedProfesores);

          console.log("set clases home:", setClases)

        } catch (error) {
          console.error('Error al obtener datos del backend:', error);
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
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n')
      


  const mappedCategorias = categorias
  .filter((categoria) => categoria.nombre) // Filtra categorías sin nombre
  .map((categoria) => ({
    id: categoria.id,
    nombre: categoria.nombre,
    imagen: `/images/categories/${normalizeName(categoria.nombre)}.png`, // Genera la ruta de imagen directamente
  }));

  const handleSeeMoreClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/clases';
    }
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
      <Profesores profesores={profesores} limit={3} itemsPerPage={3} />
    </div>
  );
};

export default HomeView;