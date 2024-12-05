import { IEditUserErrors, IEditUserProps } from "@/interfaces/IEditUser";
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
  } else if (!/^\d{9,12}$/.test(String(values.telefono))) {
    errors.telefono =
      "El número de teléfono debe ser numérico y tener entre 9 y 12 caracteres";
  }

  // Validación de la edad
  if (!values.edad) {
    errors.edad = "La edad es un campo obligatorio";
  } else if (parseInt(String(values.edad)) < 13) {
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

  if (values.imagen) {
    if (!(values.imagen instanceof File)) {
      errors.imagen = "La imagen debe ser un archivo válido";
    } else if (!["image/jpeg", "image/png"].includes(values.imagen.type)) {
      errors.imagen = "Solo se permiten imágenes en formato JPEG o PNG";
    } else if (values.imagen.size > 10 * 1024 * 1024) { // 10MB
      errors.imagen = "La imagen no debe exceder los 10MB";
    }
  }

  return errors;
}


export function validateEditUserForm(values: IEditUserProps): IEditUserErrors {
  const errors: IEditUserErrors = {};

  // Validación del nombre
  if (!values.nombre) {
    errors.nombre = "El nombre es un campo obligatorio";
  }  if (values.nombre.length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres";
  } else if (values.nombre.length > 80) {
    errors.nombre = "El nombre no debe exceder los 80 caracteres";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.nombre)) {
    errors.nombre = "El nombre no debe contener caracteres especiales";
  }

  // Validación del email
  if (!values.email) {
    errors.email = "El email es un campo obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no tiene un formato válido";
  }

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
  } else {
    const edadNumerica = parseInt(values.edad, 10);
    if (isNaN(edadNumerica)) {
      errors.edad = "La edad debe ser un número válido";
    } else if (edadNumerica < 13) {
      errors.edad = "Debes ser mayor de 13 años para registrarte";
    } else if (edadNumerica > 120) {
      errors.edad = "La edad ingresada no es válida";
    }
  }

  // Validación de la imagen (opcional)
  if (values.image) {
    if (!(values.image instanceof File)) {
      errors.image = "La imagen debe ser un archivo válido";
    } else if (!["image/jpeg", "image/png"].includes(values.image.type)) {
      errors.image = "Solo se permiten imágenes en formato JPEG o PNG";
    } else if (values.image.size > 10 * 1024 * 1024) { // 10MB
      errors.image = "La imagen no debe exceder los 10MB";
    }
  }
  // Validación de la contraseña
  if (!values.contrasena) {
    errors.contrasena = "";
  } else if (values.contrasena.length < 8) {
    errors.contrasena = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(values.contrasena)) {
    errors.contrasena = "La contraseña debe incluir al menos una letra mayúscula";
  } else if (!/[a-z]/.test(values.contrasena)) {
    errors.contrasena = "La contraseña debe incluir al menos una letra minúscula";
  } else if (!/[0-9]/.test(values.contrasena)) {
    errors.contrasena = "La contraseña debe incluir al menos un número";
  } else if (!/[\W_]/.test(values.contrasena)) {
    errors.contrasena = "La contraseña debe incluir al menos un carácter especial";
  }

  return errors;
}
