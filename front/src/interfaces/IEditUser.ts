export interface IEditUserErrors {
  nombre?: string;
  email?: string;
  telefono?: string; // Normalizamos como string para facilidad en validaciones.
  edad?: string; // Lo mismo para edad.
  image?: string; // Aquí almacenamos un mensaje de error, no el archivo.
  rol?: string;
  contrasena?: string
}

export interface IEditUserProps {
  nombre: string;
  email: string;
  telefono: string; // Lo tratamos como string para manipularlo fácilmente.
  edad: string; // Igual que el teléfono.
  image?: File | null; // Permite que sea un archivo o nulo.
  rol?: string;
  contrasena: string
}