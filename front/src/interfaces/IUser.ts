import { IClase } from "./IClase";

export enum rolEnum {
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
    contrasena: string;               // Contraseña del usuario
    rol: rolEnum;                    // Rol del usuario (admin, profesor, cliente)
    clases?: IClase[];                  // Clase asociada al usuario (opcional)
   // turnos: Turnos[];                
}