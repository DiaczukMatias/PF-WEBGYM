export interface IRegisterErrors {
  nombre?: string;
  email?: string;
  contrasena?: string;
  confirmarContrasena?:string;
  telefono?: string;
  edad?: string;
}

export interface IRegisterProps {
  name: string;
  email: string;
  contrasena: string;
  confirmarContrasena:string;
  telefono: string;
  edad: string;
}
