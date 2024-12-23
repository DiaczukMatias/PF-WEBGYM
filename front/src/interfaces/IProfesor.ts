import { IClase } from "@/interfaces/IClase";
import { IUsuario } from "@/interfaces/IUser";


export interface IProfesor {
    id: string;                     // Identificador único del profesor
    nombre: string;                 // Nombre del profesor
    descripcion?: string;            // Descripción del profesor
    certificacion?: string;          // Certificación del profesor
    imagen?: string;                 // URL de la imagen del profesor
    clases?: IClase[];              // Lista de clases asociadas al profesor
    usuario?: IUsuario;
    usuarioId?: IUsuario["id"];
    perfilProfesor: IPerfilProfesor;
    
}

export interface IPerfilProfesor {
    id: string;
    nombre: string;
   descripcion?: string;
   certificacion?: string;
   imagen?: string;
   usuarioId: IUsuario["id"];
   clases?: IClase[];
   estado?: boolean;
   usuario?: IUsuario;
}