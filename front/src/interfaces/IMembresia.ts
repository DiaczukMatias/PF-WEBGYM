import { IUsuario } from "./IUser";
import { IInscripcion } from "./IInscripcion";

export interface IMembresia {
    id?: string;
    nombre: string;
    precio: number;
    descripcion?: string;
    features?: string[];
    duracionEnMeses?: number;
    fechaCreacion?: Date | string;
    fechaExpiracion?: Date | string;
    fechaActualizacion?: Date | string;
    activa?: boolean;  // Si es true, la membresía está disponible para nuevos usuarios
    usuario?: IUsuario;
    inscripciones?: IInscripcion[];
}