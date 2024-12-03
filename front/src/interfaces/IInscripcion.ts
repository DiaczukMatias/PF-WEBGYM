import { IClase } from "@/interfaces/IClase";
import { IMembresia } from "@/interfaces/IMembresia";
import { IUsuario } from "@/interfaces/IUser";

export interface IInscripcion {
    id: string;
    fechaInscripcion: Date;
    fechaVencimiento: Date;
    clase?: IClase[];
    membresia?: IMembresia[];
    usuario?: IUsuario[];
    estado?: "activa" | "inactiva"
}