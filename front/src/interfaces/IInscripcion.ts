import { IClase } from "./IClase";
import { IMembresia } from "./IMembresia";
import { IUsuario } from "./IUser";

export interface IInscripcion {
    id: string;
    fechaInscripcion: Date;
    fechaVencimiento: Date;
    clase?: IClase;
    membresia?: IMembresia;
    usuario?: IUsuario;
}