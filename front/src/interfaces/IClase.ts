import { ICategoria } from "./ICategory";
import { IProfesor } from "./IProfesor";
import { IInscripcion } from "./IInscripcion";

export interface IClase {
  id: string;                      // Identificador único de la clase (UUID)
  nombre: string;                  // Nombre de la clase
  descripcion: string;             // Descripción de la clase
  fecha: Date;      //se modifico      example: 2024-10-10T14:00:00Z       // Fecha y hora de la clase
  disponibilidad?: number;         // Disponibilidad de espacios (opcional)
  imagen?: string;                 // URL o ruta de la imagen de la clase (opcional)
  // ya no vausuario?: IUsuario;              // Usuario relacionado con la clase (opcional)
 // no va turnos?: string; // ITurno[];               // Lista de turnos asociados a la clase
  categoriaId: ICategoria["id"]; //nuevo
  categoria?: ICategoria;         // Categoría a la que pertenece la clase (opcional)
  profesores?: IProfesor;          // Profesor que dicta la clase (opcional)
  inscripciones?: IInscripcion[]; //nuevo
}
