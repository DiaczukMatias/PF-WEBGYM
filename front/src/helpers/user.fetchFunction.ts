import { FetchError } from "@/interfaces/IErrors";
import { IRegisterProps } from "@/interfaces/IRegister";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const registerPost = async (userData: IRegisterProps, file?: File) => {
  try {
    // Crear una instancia de FormData
    const formData = new FormData();
     // Agregar campos al FormData
     formData.append("nombre", userData.nombre);
     formData.append("email", userData.email);
     formData.append("contrasena", userData.contrasena);
     formData.append("confirmarContrasena", userData.confirmarContrasena);
     formData.append("edad", String(userData.edad)); // Convertir número a string
     formData.append("telefono", String(userData.telefono)); // Convertir número a string
 
     // Agregar la imagen solo si está presente
     if (file) {
       formData.append("imagen", file);
     }
     // Hacer el fetch con `multipart/form-data`

    const response = await fetch(`${apiUrl}/usuarios/register`, {
      method: "POST",
      body: formData, // Enviar FormData
    });

    const responseData = await response.json();

    if (response.status === 201) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: responseData.message || "Register complete",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'bg-accent text-white',
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white');
            popup.style.backgroundColor = '#333'; // Fondo oscuro
            popup.style.color = 'white'; // Texto blanco
          }
        },
      });
      return responseData; // Devuelve el dato necesario para la redirección
    } else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.message.join(", ") || "Bad Request",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
    } else if (response.status === 500) {
      // ESTO LO DEVUELVE CUANDO HAY UN USUARIO DUPLICADO
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.message || "Internal Server Error",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
    } else {
      throw new Error("Error: Unexpected response status");
    }
  } catch (error) {
    if (isFetchError(error)) {
      // Es un FetchError tipado
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "An unknown error occurred",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
    } else {
      // Es otro tipo de error desconocido
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred.",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
    }
    throw error;
  }
};

function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as FetchError).message === "string"
  );
}