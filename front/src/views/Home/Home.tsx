'use client';

import React from 'react';
import { IClase } from "@/interfaces/IClase";
import { ICategoria } from "@/interfaces/ICategory";
import { IProfesor } from "@/interfaces/IProfesor";
import ClassCardList from "@/components/CardList/CardList"; // Asegúrate de que este componente esté importado correctamente
import Category from "@/components/Categories/Categories";
import Profesores from "@/components/Profesor/Profesor";
import Carrusel from "@/components/Carrusel.tsx/Carrusel";

// data temporal hasta hacer la conexión con back
const categoriesData: ICategoria[] = [
  { id: '1', nombre: 'crossfit' },
  { id: '2', nombre: 'cardio' },
  { id: '3', nombre: 'boxing' },
  { id: "4", nombre: "strength training" },
];

const clasesData: IClase[] = [
  {
    id: '1',
    nombre: 'Yoga',
    descripcion: 'Clase de yoga avanzada',
    horario: new Date('2024-11-01T08:00:00'),
    categorias: categoriesData[0], // Asignamos una categoría
    imagen: '/images/clases/yoga.jpg', // Ruta de la imagen de la clase
  },
  {
    id: '2',
    nombre: 'Pilates',
    descripcion: 'Entrenamiento de pilates para principiantes',
    horario: new Date('2024-11-02T18:00:00'),
    categorias: categoriesData[1], // Asignamos una categoría
    imagen: '/images/clases/pilates.jpg',
  },
  {
    id: '3',
    nombre: 'Natación',
    descripcion: 'Clase de natación para todas las edades',
    horario: new Date('2024-11-03T10:00:00'),
    categorias: categoriesData[2], // Asignamos una categoría
    imagen: '/images/clases/natacion.jpg',
  },
]

const profesoresData: IProfesor[] = [
  {
    id: '1',
    nombre: 'Profesor 1',
    descripcion: 'Especialista en musculación y acondicionamiento físico',
    certificacion: 'Certificación Internacional en Musculación',
    imagen: '/images/profesor/profe1.png',
    clases: [clasesData[0], clasesData[1]],
  },
  {
    id: '2',
    nombre: 'Profesor 2',
    descripcion: 'Instructora de aeróbica y zumba con 10 años de experiencia',
    certificacion: 'Certificación en Aeróbica y Zumba',
    imagen: '/images/profesor/profe2.png',
    clases: [clasesData[1], clasesData[2]],
  },
  {
    id: '3',
    nombre: 'Profesor 3',
    descripcion: 'Profesor de natación y ejercicios en piscina',
    certificacion: 'Certificación en Entrenamiento Acuático',
    imagen: '/images/profesor/profe3.png',
    clases: [clasesData[2]],
  },
];

const HomeView = () => {
  // Crear un array de categorías con nombre e imagen
  const categorias = categoriesData.map((categoria) => ({
    nombre: categoria.nombre,
    imagen: `/images/categories/${categoria.nombre}.png`,
  }));

  return (
    <div>
      <Carrusel categorias={categorias} />
      <Category categories={categoriesData} />      
      <ClassCardList classes={clasesData} />
      
      <Profesores profesores={profesoresData} />
    </div>
  );
};

export default HomeView;
