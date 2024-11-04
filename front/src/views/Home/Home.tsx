
import Category from "@/components/Categories/Categories";
import { ICategoria } from "@/interfaces/ICategory";
import Profesores from "@/components/Profesor/Profesor";
import { IProfesor } from "@/interfaces/IProfesor";
import { IClase } from "@/interfaces/IClase";

const categoriesData: ICategoria[] = [
    { id: '1', nombre: 'musculacion' },
    { id: '2', nombre: 'aerobica' },
    { id: '3', nombre: 'piscina' },
  ];

  
const clasesData: IClase[] = [
    {
        id: '1',
        nombre: 'Yoga',
        descripcion: 'Clase de yoga avanzada',
        horario: new Date('2024-11-01T08:00:00'), // Ejemplo de fecha y hora específica
    },
    {
        id: '2',
        nombre: 'Pilates',
        descripcion: 'Entrenamiento de pilates para principiantes',
        horario: new Date('2024-11-02T18:00:00'), // Ejemplo de fecha y hora específica
    },
    {
        id: '3',
        nombre: 'Natación',
        descripcion: 'Clase de natación para todas las edades',
        horario: new Date('2024-11-03T10:00:00'), // Ejemplo de fecha y hora específica
    },
];

  const profesoresData: IProfesor[] = [
    {
        id: '1',
        nombre: 'Carlos Pérez',
        descripcion: 'Especialista en musculación y acondicionamiento físico',
        certificacion: 'Certificación Internacional en Musculación',
        imagen: '/images/profesor/carlosPerez.jpg',  // Ruta de la imagen del profesor
        clases: [clasesData[0], clasesData[1]],  // Clases asociadas
    },
    {
        id: '2',
        nombre: 'Ana García',
        descripcion: 'Instructora de aeróbica y zumba con 10 años de experiencia',
        certificacion: 'Certificación en Aeróbica y Zumba',
        imagen: '/images/profesor/anaGarcia.jpg',
        video: 'https://example.com/video/anaGarcia',
        clases: [clasesData[1], clasesData[2]],
    },
    {
        id: '3',
        nombre: 'Pedro López',
        descripcion: 'Profesor de natación y ejercicios en piscina',
        certificacion: 'Certificación en Entrenamiento Acuático',
        imagen: '/images/profesor/pedroLopez.jpg',
        video: 'https://example.com/video/pedroLopez',
        clases: [clasesData[2]],
    },
]


const HomeView = () => {
    return (
        <div>
       <Category categories={categoriesData} />
       <p> Clases favoritas:  ( agregar cardlist de resumen de 3 clases y boton ver mas clases) </p>
       <Profesores profesores={profesoresData}/>
        </div>
    )
}

export default HomeView;
