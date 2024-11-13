import { IProfesor } from "@/interfaces/IProfesor";
import { IClase } from "@/interfaces/IClase";
import { ICategoria } from "@/interfaces/ICategory";
import { ILoginProps } from "@/interfaces/ILogin";

export const categoriesData: ICategoria[] = [
  { id: '1', nombre: 'crossfit' },
  { id: '2', nombre: 'cardio' },
  { id: '3', nombre: 'boxing' },
  { id: "4", nombre: "strength training" },
];

// Datos de perfilProfesor
export const profesoresData: IProfesor[] = [
  {
    id: '1',
    nombre: 'Mark Thompson',
    descripcion: 'Especialista en musculación y acondicionamiento físico',
    certificacion: 'Certificación Internacional en Musculación',
    imagen: '/images/profesor/profe2.png',
    clases: [], // Referencias por posición
  },
  {
    id: '2',
    nombre: 'Jessica Roberts',
    descripcion: 'Profesora de funcional y ejercicios en gym',
    certificacion: 'Certificación en Entrenamiento Acuático',
    imagen: '/images/profesor/profe3.png',
    clases: [],
  },
  {
    id: '3',
    nombre: 'Michael Johnson',
    descripcion: 'Especialista en musculación y acondicionamiento físico',
    certificacion: 'Certificación Internacional en Musculación',
    imagen: '/images/profesor/profe1.png',
    clases: [],
  },
  {
    id: '4',
    nombre: 'Pedro',
    descripcion: 'Instructora de funcional y zumba con 10 años de experiencia',
    certificacion: 'Certificación en funcional y Zumba',
    imagen: '/images/profesor/pedroLopez.jpg',
    clases: [],
  },
  {
    id: '5',
    nombre: 'Sofia',
    descripcion: 'Instructora de aeróbica y zumba con 10 años de experiencia',
    certificacion: 'Certificación en Aeróbica y Zumba',
    imagen: '/images/profesor/sofia.png',
    clases: [],
  },
  {
    id: '6',
    nombre: 'Gonzalo',
    descripcion: 'Profesor de natación y ejercicios en piscina',
    certificacion: 'Certificación en Entrenamiento Acuático',
    imagen: '/images/profesor/gonzalo.png',
    clases: [],
  },
];

// Asignación de `clasesData` después de `profesoresData` para evitar errores de referencia
export const clasesData: IClase[] = [
  {
    id: '1',
    nombre: 'Crossfit',
    descripcion: 'Clase de crossfit avanzada',
    fecha: new Date('2024-11-01T10:00:00'),
    categoriaId: "1",
    categoria: categoriesData[0],
    imagen: '/images/clases/crossfit.jpg',
    perfilProfesor: profesoresData[0],
  },
  {
    id: '2',
    nombre: 'Gym',
    descripcion: 'Entrenamiento funcional',
    fecha: new Date('2024-11-01T14:00:00'),
    categoriaId: "2",
    categoria: categoriesData[1],
    imagen: '/images/clases/funcional.jpg',
    perfilProfesor:  profesoresData[2],
  },
  {
    id: '3',
    nombre: 'Natacion',
    descripcion: 'Clase de natación para todas las edades',
    fecha: new Date('2024-11-03T10:00:00'),
    categoriaId: "3",
    categoria: categoriesData[2],
    imagen: '/images/clases/natacion.jpg',
    perfilProfesor: profesoresData[5],
  },
  {
    id: '4',
    nombre: 'Yoga',
    descripcion: 'Clase de yoga avanzada',
    fecha: new Date('2024-11-03T14:00:00'),
    categoriaId: "1",
    categoria: categoriesData[0],
    imagen: '/images/clases/yoga.jpg',
    perfilProfesor: profesoresData[4],
  },
  {
    id: '5',
    nombre: 'Pilates',
    descripcion: 'Entrenamiento de pilates para principiantes',
    fecha: new Date('2024-11-02T10:00:00'),
    categoriaId: "2",
    categoria: categoriesData[1],
    imagen: '/images/clases/pilates.png',
    perfilProfesor: profesoresData[1],
  },
  {
    id: '6',
    nombre: 'Zumba',
    descripcion: 'Clase de zumba para todas las edades',
    fecha: new Date('2024-11-02T14:00:00'),
    categoriaId: "4",
    categoria: categoriesData[3],
    imagen: '/images/clases/zumba.jpg',
    perfilProfesor:  profesoresData[3],
  },
];


// Asignación de clases a perfilProfesor
profesoresData[0].clases = [clasesData[0], clasesData[1]]; // Mark Thompson
profesoresData[1].clases = [clasesData[4]];                 // Jessica Roberts
profesoresData[2].clases = [clasesData[0], clasesData[1]];   // Michael Johnson
profesoresData[3].clases = [clasesData[1], clasesData[5]];   // Pedro López
profesoresData[4].clases = [clasesData[3], clasesData[4], clasesData[5]]; // Sofía Martínez
profesoresData[5].clases = [clasesData[2]];                  // Gonzalo Pérez


export const temporalLogin : ILoginProps = {
  email: "prueba@mail.com",
  contrasena: "Prueba123!"
}
 
/*
import { IClase } from "@/interfaces/IClase";
import { ICategoria } from "@/interfaces/ICategory";
import { IProfesor } from "@/interfaces/IProfesor";
import {ILoginProps} from "@/interfaces/ILogin"

// data temporal hasta hacer la conexión con back
export const categoriesData: ICategoria[] = [
    { id: '1', nombre: 'crossfit' },
    { id: '2', nombre: 'cardio' },
    { id: '3', nombre: 'boxing' },
    { id: "4", nombre: "strength training" },
  ];
  
export  const clasesData: IClase[] = [
    {
      id: '1',
      nombre: 'Crossfit',
      descripcion: 'Clase de crossfit avanzada',
      fecha: new Date('2024-11-01T10:00:00'),
      categoriaId: "1",
      categoria: categoriesData[0], // Asignamos una categoría
      imagen: '/images/clases/yoga.jpg', // Ruta de la imagen de la clase
    },
    {
      id: '2',
      nombre: 'Funcional',
      descripcion: 'Entrenamiento funcional',
      fecha: new Date('2024-11-01T14:00:00'),
      categoriaId: "2",
      categoria: categoriesData[1], // Asignamos una categoría
      imagen: '/images/clases/funcional.jpg',
    },
    {
      id: '3',
      nombre: 'Natación',
      descripcion: 'Clase de natación para todas las edades',
      fecha: new Date('2024-11-03T10:00:00'),
      categoriaId: "3",
      categoria: categoriesData[2], // Asignamos una categoría
      imagen: '/images/clases/natacion.jpg',
    },
    {
        id: '4',
        nombre: 'Yoga2',
        descripcion: 'Clase de yoga avanzada',
        fecha: new Date('2024-11-03T14:00:00'),
        categoriaId: "1",
        categoria: categoriesData[0], // Asignamos una categoría
        imagen: '/images/clases/yoga.jpg', // Ruta de la imagen de la clase
      },
      {
        id: '5',
        nombre: 'Pilates',
        descripcion: 'Entrenamiento de pilates para principiantes',
        fecha: new Date('2024-11-02T10:00:00'),
        categoriaId: "2",
        categoria: categoriesData[1], // Asignamos una categoría
        imagen: '/images/clases/pilates.png',
      },
      {
        id: '6',
        nombre: 'Zumba',
        descripcion: 'Clase de zumba para todas las edades',
        fecha: new Date('2024-11-02T14:00:00'),
        categoriaId: "4",
        categoria: categoriesData[3], // Asignamos una categoría
        imagen: '/images/clases/natacion.jpg',
      },
    
  ]
  
 export const profesoresData: IProfesor[] = [
    {
      id: '1',
      nombre: 'Carlos',
      descripcion: 'Especialista en musculación y acondicionamiento físico',
      certificacion: 'Certificación Internacional en Musculación',
      imagen: '/images/profesor/profe1.png',
      clases: [clasesData[0], clasesData[1]],
    },
    {
      id: '2',
      nombre: 'Pedro',
      descripcion: 'Instructora de funcional y zumba con 10 años de experiencia',
      certificacion: 'Certificación en funcionañ y Zumba',
      imagen: '/images/profesor/pedroLopez.jpg',
      clases: [clasesData[1], clasesData[2]],
    },
    {
      id: '3',
      nombre: 'Ana',
      descripcion: 'Profesor de natación y ejercicios en piscina',
      certificacion: 'Certificación en Entrenamiento Acuático',
      imagen: '/images/profesor/profe3.png',
      clases: [clasesData[1]],
    },
    {
      id: '4',
      nombre: 'franco',
      descripcion: 'Especialista en musculación y acondicionamiento físico',
      certificacion: 'Certificación Internacional en Musculación',
      imagen: '/images/profesor/profe2.png',
      clases: [clasesData[0], clasesData[1]],
    },
    {
      id: '5',
      nombre: 'Sofia',
      descripcion: 'Instructora de aeróbica y zumba con 10 años de experiencia',
      certificacion: 'Certificación en Aeróbica y Zumba',
      imagen: '/images/profesor/sofia.png',
      clases: [clasesData[4], clasesData[2]],
    },
    {
      id: '6',
      nombre: 'Gonzalo',
      descripcion: 'Profesor de natación y ejercicios en piscina',
      certificacion: 'Certificación en Entrenamiento Acuático',
      imagen: '/images/profesor/gonzalo.png',
      clases: [clasesData[2]],
    },
  ];

  export const temporalLogin : ILoginProps = {
    email: "prueba@mail.com",
    contrasena: "Prueba123!"
  }
    */