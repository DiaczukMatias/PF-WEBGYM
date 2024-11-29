import { IProfesor } from "./IProfesor";
import { IMembresia } from "./IMembresia";
import { IInscripcion } from "./IInscripcion";

export enum RolEnum {
    ADMIN = 'admin',
    PROFESOR = 'profesor',
    CLIENTE = 'cliente',
}

export interface IUsuario {
    id: string;                       // Identificador único del usuario
    nombre: string;                   // Nombre del usuario
    edad?: number;                    // Edad del usuario (opcional)
    telefono?: number;                // Teléfono del usuario (opcional)
    email: string;                    // Correo electrónico del usuario
    contrasena?: string;               // Contraseña del usuario
    rol: RolEnum;                    // Rol del usuario (admin, profesor, cliente)
    perfilProfesor?: IProfesor;    //nuevas:
    membresia?: IMembresia;
    inscripciones?: IInscripcion[];
    city?: string;    //agregaron q al editar el perfil del usuario ingresar la informacion de city y adress
    address?: string;
    activo?: boolean;  
    clase?: string // se agrego para inscripcion
}  