import { IProfesor } from "@/interfaces/IProfesor";
import { IMembresia } from "@/interfaces/IMembresia";
import { IInscripcion } from "@/interfaces/IInscripcion";

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
    estado?: boolean;  
    clase?: string // se agrego para inscripcion
}  