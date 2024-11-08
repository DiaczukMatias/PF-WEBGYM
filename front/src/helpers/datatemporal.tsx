import { IClase } from "@/interfaces/IClase";
import { ICategoria } from "@/interfaces/ICategory";
import { IProfesor } from "@/interfaces/IProfesor";

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
      nombre: 'Yoga',
      descripcion: 'Clase de yoga avanzada',
      fecha: new Date('2024-11-01T10:00:00'),
      categoriaId: "1",
      categoria: categoriesData[0], // Asignamos una categoría
      imagen: '/images/clases/yoga.jpg', // Ruta de la imagen de la clase
    },
    {
      id: '2',
      nombre: 'Pilates',
      descripcion: 'Entrenamiento de pilates para principiantes',
      fecha: new Date('2024-11-02T10:00:00'),
      categoriaId: "2",
      categoria: categoriesData[1], // Asignamos una categoría
      imagen: '/images/clases/pilates.jpg',
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
        nombre: 'Pilates2',
        descripcion: 'Entrenamiento de pilates para principiantes',
        fecha: new Date('2024-11-01T14:00:00'),
        categoriaId: "2",
        categoria: categoriesData[1], // Asignamos una categoría
        imagen: '/images/clases/pilates.jpg',
      },
      {
        id: '6',
        nombre: 'Natación2',
        descripcion: 'Clase de natación para todas las edades',
        fecha: new Date('2024-11-02T14:00:00'),
        categoriaId: "3",
        categoria: categoriesData[2], // Asignamos una categoría
        imagen: '/images/clases/natacion.jpg',
      },
    
  ]
  
 export const profesoresData: IProfesor[] = [
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
    {
      id: '4',
      nombre: 'Profesor 4',
      descripcion: 'Especialista en musculación y acondicionamiento físico',
      certificacion: 'Certificación Internacional en Musculación',
      imagen: '/images/profesor/profe1.png',
      clases: [clasesData[0], clasesData[1]],
    },
    {
      id: '5',
      nombre: 'Profesor 5',
      descripcion: 'Instructora de aeróbica y zumba con 10 años de experiencia',
      certificacion: 'Certificación en Aeróbica y Zumba',
      imagen: '/images/profesor/profe2.png',
      clases: [clasesData[1], clasesData[2]],
    },
    {
      id: '6',
      nombre: 'Profesor 6',
      descripcion: 'Profesor de natación y ejercicios en piscina',
      certificacion: 'Certificación en Entrenamiento Acuático',
      imagen: '/images/profesor/profe3.png',
      clases: [clasesData[2]],
    },
  ]