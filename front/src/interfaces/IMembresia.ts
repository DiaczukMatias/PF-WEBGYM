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
}