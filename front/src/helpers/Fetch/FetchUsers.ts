import { IRegisterProps } from "@/interfaces/IRegister";
import Swal from "sweetalert2";
import { IUsuario } from "@/interfaces/IUser";
import { ILoginProps } from "@/interfaces/ILogin";
import { FetchError } from "@/interfaces/IErrors";
import { Token } from "../accestoke";
import { IEditUserProps } from "@/interfaces/IEditUser";

//funcion para manejerar tipo de error
function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as FetchError).message === "string"
  );
}


// Configuración base

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Función para configurar los headers de autorización
const authHeader = () => ({
  Authorization: `Bearer ${Token}`,
  'Content-Type': 'application/json',
});

// Funciones para cada operación HTTP

// 1. Iniciar sesión (No protegida)
export const loginUser = async (credentials: ILoginProps) => {
    const { email, contrasena } = credentials!;
    const res = await fetch(`${apiUrl}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena }),
    });
    const user = await res.json();

    if (res.ok && user) {
      // Aquí estamos regresando el usuario y token
      return {
        id: user.usuario.id,
        name: user.usuario.nombre,
        email: user.usuario.email,
        telefono: user.usuario.telefono,
        rol: user.usuario.rol,
        accessToken: user.token,
      };
    }
    return null;
  }

// 2. Registrar usuario (No protegida)
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

// 3. Obtener todos los usuarios (Protegida, solo admin)
export const fetchUsers = async (page = 1, limit = 5) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios?page=${page}&limit=${limit}`, {
      headers: authHeader(),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error){
    console.error('Error al obtener usuarios:', error.message);
    throw error;}
    return [];
  }
};

// 4. Obtener un usuario por ID (Protegida, solo admin)
export const fetchUserById = async (id: string) => {
  if (!id) {
    throw new Error("El ID proporcionado es inválido");
  }
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}`, {
      headers: authHeader(),
    });
    console.log(`URL Fetch: ${apiUrl}/usuarios/${id}`);
    console.log(authHeader());
    
    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error.message);
    throw error;}
    return [];
  }
};

// 5. Actualizar un usuario por ID (Protegida)
export const updateUser = async (id: string, updatedUser: IEditUserProps) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}`, {
      method: 'PUT',
      headers: authHeader(),
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error){
    console.error(`Error al actualizar el usuario con ID ${id}:`, error.message);
    throw error;}
    return [];
  }
};

// 6. Eliminar un usuario por ID (Protegida)
export const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: authHeader(),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error){
    console.error(`Error al eliminar el usuario con ID ${id}:`, error.message);
    throw error;}
    return [];
  }
};

// 7. Actualizar perfil del usuario autenticado (Protegida)
export const updateProfile = async ( profileData: IUsuario) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'PUT',
      headers: authHeader(),
      body: JSON.stringify({  ...profileData }),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error){
    console.error('Error al actualizar el perfil:', error.message);
    throw error;}
    return [];
  }
};
