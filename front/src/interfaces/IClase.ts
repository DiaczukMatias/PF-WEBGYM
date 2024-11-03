import { ICategoria } from "./ICategory";
import { IProfesor } from "./IProfesor";
import { IUsuario } from "./IUser";

export interface IClase {
  id: string;                      // Identificador único de la clase (UUID)
  nombre: string;                  // Nombre de la clase
  descripcion: string;             // Descripción de la clase
  horario: Date;                   // Fecha y hora de la clase
  disponibilidad?: number;         // Disponibilidad de espacios (opcional)
  imagen?: string;                 // URL o ruta de la imagen de la clase (opcional)
  usuario?: IUsuario;              // Usuario relacionado con la clase (opcional)
  turnos?: string; // ITurno[];               // Lista de turnos asociados a la clase
  categorias?: ICategoria;         // Categoría a la que pertenece la clase (opcional)
  profesores?: IProfesor;          // Profesor que dicta la clase (opcional)
}
