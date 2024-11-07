'use client';

import React from 'react';

import ClassCardList from "@/components/CardList/CardList"; 
import Category from "@/components/Categories/Categories";
import Profesores from "@/components/Profesor/Profesor";
import Carrusel from "@/components/Carrusel.tsx/Carrusel";
import { categoriesData, clasesData, profesoresData } from '@/helpers/datatemporal';
import { useRouter } from 'next/navigation';


// eliminar datatemporal y hacer conexion con back

const HomeView = () => {

    const router = useRouter();

    const handleSeeMoreClick = () => {
      router.push('/clases');
    };

  const categorias = categoriesData.map((categoria) => ({
    nombre: categoria.nombre,
    imagen: `/images/categories/${categoria.nombre}.png`,
  }));

  return (
    <div>
      <Carrusel categorias={categorias} />
      <Category categories={categoriesData} />   
      <div className='py-4'>
         <h2 className="flex justify-center font-bold font-sans text-xl text-accent m-4">CLASES FAVORITAS:</h2>   
      <ClassCardList classes={clasesData} limit={3}/>
      <div className="mt-4 text-center">
        <button
          onClick={handleSeeMoreClick}
          className="border border-accent text-accent px-4 py-2 rounded-lg hover:text-secondary2 "
        >
          Ver más clases
        </button>
      </div>
      </div>
     
      <Profesores profesores={profesoresData} />
    </div>
  );
};

export default HomeView;
