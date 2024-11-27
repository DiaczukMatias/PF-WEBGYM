import { IUsuario } from "./IUser";
import { IInscripcion } from "./IInscripcion";

export interface IMembresia {
    id: string;
    nombre: string;
    precio: number;
    duracionEnMeses: number;
    fechaCreacion: Date;
    fechaExpiracion: Date;
    fechaActualizacion: Date;
    activo: boolean;
    usuario?: IUsuario;
    inscripciones?: IInscripcion[];
    estado?: "activa" | "suspendida";   //  ver de q al hacer los get de clases filtrarlas y mostrar solo las activas

}