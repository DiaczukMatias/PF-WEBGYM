export interface ILoginProps {
  email: string;
  contrasena: string;
}

export interface ILoginErrors {
  email?: string;
  contrasena?: string;
}

export interface ILoginCredentials {
  email: string;
  password: string
}