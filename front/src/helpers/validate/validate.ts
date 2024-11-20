import { ILoginErrors, ILoginProps } from "@/interfaces/ILogin";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/IRegister";

/*
// Función para verificar si el email existe usando el endpoint que retorna todos los usuarios
async function emailExists(email: string): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:3010/usuarios`); // Asegúrate de que coincida con el endpoint de tu backend
    const users = await response.json();
    // Comprobamos si alguno de los usuarios tiene el email que estamos verificando
    return users.some((user: { email: string }) => user.email === email);
  } catch (error) {
    console.error("Error al verificar el email:", error);
    return false;
  }
}
*/

export  function validateLoginForm (values: ILoginProps) :ILoginErrors {
  const errors: ILoginErrors = {};

  if (!values.email) {
    errors.email = "El email es un campo obligatorio";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "El email no tiene un formato válido";
  }
  
  /*else if (!(await emailExists(values.email))) {
    errors.email = "El email no está registrado";
  }*/ 

  // Validación para la contraseña
  if (!values.contrasena) {
    errors.contrasena = "La contraseña es un campo obligatorio";
  } else if (values.contrasena.length < 8) {
    errors.contrasena = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/(?=.*[A-Z])(?=.*\d)/.test(values.contrasena)) {
    errors.contrasena =
      "La contraseña debe contener al menos un número y una letra mayúscula";
  }

  return errors;
};




export  function validateRegisterForm(values: IRegisterProps): IRegisterErrors {
  const errors: IRegisterErrors = {};

  // Validación del nombre
  if (!values.nombre) {
    errors.nombre = "El nombre es un campo obligatorio";
  } else if (values.nombre.length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 letras";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.nombre)) {
    errors.nombre = "El nombre no debe contener caracteres especiales";
  }

  // Validación del email
  if (!values.email) {
    errors.email = "El email es un campo obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no tiene un formato válido";
  } 
  /* else if (await emailExists(values.email)) {
    errors.email = "El email ya está registrado";
  }  */

  // Validación del teléfono
  if (!values.telefono) {
    errors.telefono = "El número de teléfono es un campo obligatorio";
  } else if (!/^\d{9,12}$/.test(values.telefono)) {
    errors.telefono =
      "El número de teléfono debe ser numérico y tener entre 9 y 12 caracteres";
  }

  // Validación de la edad
  if (!values.edad) {
    errors.edad = "La edad es un campo obligatorio";
  } else if (parseInt(values.edad) < 13) {
    errors.edad = "Debes ser mayor de 13 años para registrarte";
  }

  // Validación de la contraseña
  if (!values.confirmarContrasena) {
    errors.confirmarContrasena = "La contraseña es un campo obligatorio";
  } else if (values.confirmarContrasena.length < 8) {
    errors.confirmarContrasena = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/(?=.*[A-Z])/.test(values.confirmarContrasena)) {
    errors.confirmarContrasena = "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/(?=.*\d)/.test(values.confirmarContrasena)) {
    errors.confirmarContrasena = "La contraseña debe contener al menos un número";
  } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(values.confirmarContrasena)) {
    errors.confirmarContrasena = "La contraseña debe contener al menos un carácter especial";
  }

  // Validación de la repetición de la contraseña
  if (!values.confirmarContrasena) {
    errors.confirmarContrasena = "Repetir la contraseña es un campo obligatorio";
  } else if (values.confirmarContrasena !== values.contrasena) {
    errors.confirmarContrasena = "Las contraseñas no coinciden";
  }

  return errors;
}

