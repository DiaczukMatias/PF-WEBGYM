import { ICrearClase } from "@/interfaces/IClase"; // Importar la interfaz para validar

export const validateCrearClase = (clase: ICrearClase) => {
  const errores: { [key: string]: string } = {};

  if (!clase.nombre || clase.nombre.length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!clase.descripcion) {
    errores.descripcion = "La descripción es obligatoria.";
  }

  if (!clase.fecha) {
    errores.fecha = "La fecha es obligatoria.";
  }

  if (!clase.categoriaId) {
    errores.categoriaId = "Selecciona una categoría.";
  }

  if (!clase.perfilProfesorId) {
    errores.perfilProfesorId = "Selecciona un profesor.";
  }

  return errores;
};

/*
// Validar la información del formulario
export const validateCrearClase = (nuevaClase: ICrearClase) => {
  const errores: { [key: string]: string } = {};

  // Validar nombre
  if (!nuevaClase.nombre) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nuevaClase.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  // Validar descripción
  if (!nuevaClase.descripcion) {
    errores.descripcion = "La descripción es obligatoria.";
  } else if (nuevaClase.descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  // Validar fecha
  if (!nuevaClase.fecha) {
    errores.fecha = "La fecha es obligatoria.";
  } else {
    const fechaActual = new Date();
    const fechaClase = new Date(nuevaClase.fecha);
    if (fechaClase < fechaActual) {
      errores.fecha = "La fecha no puede ser en el pasado.";
    } else if (isNaN(fechaClase.getTime())) {
      errores.fecha = "La fecha no tiene un formato válido.";
    }
  }

  // Validar categoría
  if (!nuevaClase.categoriaId) {
    errores.categoria = "La categoría es obligatoria.";
  } 

    // Validar imagen URL
const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  if (!nuevaClase.imagen) {
    errores.imagen = "La URL de la imagen es obligatoria.";
  } else if (!isValidURL(nuevaClase.imagen)) {
    errores.imagen = "La URL de la imagen no es válida.";
  }

  // Validar disponibilidad
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:
  if (nuevaClase.disponibilidad <= 0) {
    errores.disponibilidad = "La disponibilidad debe ser mayor a 0.";
  }

  return errores;
};
*/