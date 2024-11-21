import { FetchError } from "@/interfaces/IErrors";
import { IRegisterProps } from "@/interfaces/IRegister";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const registerPost = async (userData: IRegisterProps) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (response.status === 201) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: responseData.message || "Register complete",
        showConfirmButton: false,
        timer: 1500,
      });
      return responseData; // Devuelve el dato necesario para la redirección
    } else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.message.join(", ") || "Bad Request",
      });
    } else if (response.status === 500) {
      // ESTO LO DEVUELVE CUANDO HAY UN USUARIO DUPLICADO
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.message || "Internal Server Error",
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
      });
    } else {
      // Es otro tipo de error desconocido
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred.",
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