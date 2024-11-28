import { ICategoria } from "./ICategory";
import { IPerfilProfesor, IProfesor} from "./IProfesor";
import { IInscripcion } from "./IInscripcion";

export interface IClase {
  id: string; // Identificador único de la clase (UUID)
  nombre: string; // Nombre de la clase
  descripcion: string; // Descripción de la clase
  fecha: Date | string; //se modifico      example: 2024-10-10T14:00:00Z       // Fecha y hora de la clase
  disponibilidad?: number; // Disponibilidad de espacios (opcional)
  imagen?: string; // URL o ruta de la imagen de la clase (opcional)
  categoriaId: ICategoria["id"]; //nuevo
  categoria?: ICategoria; // Categoría a la que pertenece la clase (opcional)
  inscripciones?: IInscripcion[]; //nuevo
  perfilProfesor?: IPerfilProfesor | IProfesor;  //IProfesor puede ser // cada clase tiene 1 profesor pero cada rpofesor puede tener multiples clases
  activo?: boolean;  
}

export interface ICrearClase {
  nombre: string; // Nombre de la clase
  descripcion: string; // Descripción de la clase
  fecha: string; //se modifico      example: 2024-10-10T14:00:00Z       // Fecha y hora de la clase
  disponibilidad: number; // Disponibilidad de espacios (opcional)
  imagen?: File | null; // URL o ruta de la imagen de la clase (opcional)
  categoriaId: ICategoria["id"]; // Categoría a la que pertenece la clase (opcional)
  perfilProfesorId: IPerfilProfesor["id"];
}
