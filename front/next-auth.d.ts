// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'; //no quitar sino rompe algo en route
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';//no quitar sino rompe algo en route
import { IInscripcion } from '@/interfaces/IInscripcion';
import { IMembresia } from '@/interfaces/IMembresia';
import { IClase } from '@/interfaces/IClase';

declare module 'next-auth' {
  interface User {

    id: string;
    email: string;
    name: string;
    telefono?: string;
    rol: string;
    accessToken?: string;
    edad?:string;
    membresia?:  {id: string;
      nombre: string;
      precio: number;
      duracionEnMeses: number;
      fechaCreacion: Date;
      fechaExpiracion: Date;
      fechaActualizacion: Date;
      activo: boolean;
      usuario?: IUsuario;
      inscripciones?: IInscripcion[]; } | know; 
    inscripciones?: { id: string;
      fechaInscripcion: Date;
      fechaVencimiento: Date;
      clase?: IClase[];
      membresia?: IMembresia;
      usuario?: IUsuario;}[] | know;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    telefono?: string | null;
    rol: string;
    accessToken?: string;
  }
}
