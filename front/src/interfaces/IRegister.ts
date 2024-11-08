export interface IRegisterErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

export interface IRegisterProps {
  nombre: string;
  email: string;
  contrasena: string;
  confirmarContrasena: string;  //La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)
  edad?: number;
  telefono?: number;
}


