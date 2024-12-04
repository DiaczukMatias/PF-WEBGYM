export interface IRegisterErrors {
  nombre?: string;
  email?: string;
  contrasena?: string;
  confirmarContrasena?:string;
  telefono?: number |string;
  edad?: number |string;
  imagen?: string;
}

export interface IRegisterProps {
  nombre: string;
  email: string;
  contrasena: string;
  confirmarContrasena:string;
  telefono: number | string;
  edad: number | string;
  imagen?: File;
}


