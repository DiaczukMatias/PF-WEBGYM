import { IRegisterProps } from "@/interfaces/IRegister";
import Swal from "sweetalert2";
import { IUsuario } from "@/interfaces/IUser";
import { ILoginProps } from "@/interfaces/ILogin";

// Configuración base
const API_URL = 'http://localhost:3000/usuarios'; // Cambia esto según tu configuración del backend

// Función para obtener el token de autenticación
const getToken = () => localStorage.getItem('token');

// Función para configurar los headers de autorización
const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

// Funciones para cada operación HTTP

// 1. Iniciar sesión (No protegida)
export const loginUser = async (credentials: ILoginProps) => {
    const { email, contrasena } = credentials!;
    const res = await fetch(`http://localhost:3010/usuarios/login`, {
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
      const response = await fetch(`http://localhost:3010/usuarios/register`, {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "An unknown error occurred",
      });
      throw error;
    }
  };

// 3. Obtener todos los usuarios (Protegida, solo admin)
export const fetchUsers = async (page = 1, limit = 5) => {
  try {
    const response = await fetch(`${API_URL}/usuarios?page=${page}&limit=${limit}`, {
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
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: authHeader(),
    });

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
export const updateUser = async (id: string, updatedUser: IUsuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
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
    const response = await fetch(`${API_URL}/${id}`, {
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
    const response = await fetch(`${API_URL}/profile`, {
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
