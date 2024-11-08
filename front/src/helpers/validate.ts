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


export function validateRegisterForm(values: IRegisterProps): IRegisterErrors {
  const errors: IRegisterErrors = {};

  // Validación del nombre
  if (!values.name) {
    errors.name = "El nombre es un campo obligatorio";
  } else if (values.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 letras";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.name)) {
    errors.name = "El nombre no debe contener caracteres especiales";
  }

  // Validación del email
  if (!values.email) {
    errors.email = "El email es un campo obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no tiene un formato válido";
  }

  // Validación del teléfono
  if (!values.phone) {
    errors.phone = "El número de teléfono es un campo obligatorio";
  } else if (!/^\d{9,12}$/.test(values.phone)) {
    errors.phone =
      "El número de teléfono debe ser numérico y tener entre 9 y 12 caracteres";
  }

  // Validación de la edad
  if (!values.age) {
    errors.age = "La edad es un campo obligatorio";
  } else if (parseInt(values.age) < 13) {
    errors.age = "Debes ser mayor de 13 años para registrarte";
  }

  // Validación de la contraseña
  if (!values.password) {
    errors.password = "La contraseña es un campo obligatorio";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/(?=.*[A-Z])/.test(values.password)) {
    errors.password = "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/(?=.*\d)/.test(values.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(values.password)) {
    errors.password = "La contraseña debe contener al menos un carácter especial";
  }

  // Validación de la repetición de la contraseña
  if (!values.repeatPassword) {
    errors.repeatPassword = "Repetir la contraseña es un campo obligatorio";
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = "Las contraseñas no coinciden";
  }

  return errors;
}
