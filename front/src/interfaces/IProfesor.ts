import { IClase } from "./IClase";
import { IUsuario } from "./IUser";

export interface IProfesor {
    id: string;                     // Identificador único del profesor
    nombre: string;                 // Nombre del profesor
    descripcion?: string;            // Descripción del profesor
    certificacion?: string;          // Certificación del profesor
    imagen?: string;                 // URL de la imagen del profesor
    clases?: IClase[];              // Lista de clases asociadas al profesor
    usuario?: IUsuario;
}