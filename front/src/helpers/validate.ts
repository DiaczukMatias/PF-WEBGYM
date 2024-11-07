import { ILoginErrors, ILoginProps } from "@/interfaces/ILogin";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/IRegister";

export function validateLoginForm (values: ILoginProps) :ILoginErrors {
  const errors: ILoginErrors = {};

  if (!values.email) {
    errors.email = "El email es un campo obligatorio";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "El email no tiene un formato válido";
  }
  // Validación para la contraseña
  if (!values.password) {
    errors.password = "La contraseña es un campo obligatorio";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
    errors.password =
      "La contraseña debe contener al menos un número y una letra mayúscula";
  }

  return errors;
};


export function validateRegisterForm(values: IRegisterProps) {
  const errors: IRegisterErrors = {};

  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email es not valid";
  }
  return errors;
}
