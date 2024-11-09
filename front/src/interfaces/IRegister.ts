export interface IRegisterErrors {
  nombre?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  phone?: string;
  age?: string;
}

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
  age: string;
}
