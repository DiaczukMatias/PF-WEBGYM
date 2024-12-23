import { IRegisterProps } from "@/interfaces/IRegister";
import Swal from "sweetalert2";
import { ILoginProps } from "@/interfaces/ILogin";
import { FetchError } from "@/interfaces/IErrors";
//import { useSession } from "next-auth/react";


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

// 3. Obtener todos los usuarios (Protegida, solo admin)
export const fetchAllUsers = async (page = 1, limit = 6, accesToken:string) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
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

// 4. Obtener un usuario por ID
export const fetchUserById = async (id: string) => {
  
  if (!id) {
    throw new Error("El ID proporcionado es inválido");
  }
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}`, {
      headers: {"Content-Type": "application/json"},
    });
    
    
    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error.message);
    console.error('el id con el que se intenta fetchear es: '+id)
    console.error("URL completa:", `${apiUrl}/usuarios/${id}`);
    throw error;}
    return [];
  }
};

// 5. Actualizar un usuario por ID 
export const updateUser = async (id: string, formData: FormData) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
       // Añade headers de autenticación si es necesario
      },
      body: formData, // Usar FormData directamente
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error.message);
      throw error;
    }
  }
};


// 6. Eliminar un usuario por ID (Protegida)
export const deleteUser = async (id: string, accesToken :string) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accesToken}`
      },
      
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

/* 7. Actualizar perfil del usuario autenticado (Protegida)
export const updateProfile = async ( profileData: IUsuario, accesToken :string) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accesToken}`
      },
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
*/

//  Actualizar rol deun usuario por ID 
export const updateUserRol = async (id: string, rol:string, accesToken: string) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}/rol`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      Authorization: `Bearer ${accesToken}`,
          },
          body: JSON.stringify({rol}),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error.message);
      throw error;
    }
  }
};


/*import { IRegisterProps } from "@/interfaces/IRegister";
import Swal from "sweetalert2";
import { IUsuario } from "@/interfaces/IUser";
import { ILoginProps } from "@/interfaces/ILogin";
import { FetchError } from "@/interfaces/IErrors";
import { Token } from "../accestoke";


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
  "Content-Type": "application/json",
});
console.log('Authorization para rutas  protegidas: ',authHeader().Authorization);
// Funciones para cada operación HTTP

// 1. Iniciar sesión (No protegida)
export const loginUser = async (credentials: ILoginProps) => {
  const { email, contrasena } = credentials!;
  const res = await fetch(`${apiUrl}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
};

// 2. Registrar usuario (No protegida)
export const registerPost = async (userData: IRegisterProps) => {
  try {
    const response = await fetch(
      "https://proyecto21a.onrender.com/usuarios/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    

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
    const response = await fetch(
      `${apiUrl}/usuarios?page=${page}&limit=${limit}`,
      {
        headers: authHeader(),
      }
    );

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al obtener usuarios:", error.message);
      throw error;
    }
    return [];
  }
};

// 4. Obtener un usuario por ID (Protegida, solo admin)
export const fetchUserById = async (id: string) => {
  console.log('ID en la funcion fetchUserById ' + id );
  
  if (!id) {
    throw new Error("El ID proporcionado es inválido");
  }
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}`, {
      headers: {"Content-Type": "application/json"},
    });
    console.log(`URL Fetch: ${apiUrl}/usuarios/${id}`);
    
    
    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {

    console.error(`Error al obtener el usuario con ID ${id}:`, error.message);
    console.error('el id con el que se intenta fetchear es: '+id)
    console.error("URL completa:", `${apiUrl}/usuarios/${id}`);
    throw error;
    }
    return [];
  }
};

// 5. Actualizar un usuario por ID (Protegida)
export const updateUser = async (id: string, formData: FormData) => {
  try {
    const response = await fetch(`${apiUrl}/usuarios/${id}`, {
      method: 'PUT',
      headers:  authHeader(),
      body: formData, // Usar FormData directamente
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error.message);
      throw error;
    }
  }
};


// 6. Eliminar un usuario por ID (Protegida)
export const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error al eliminar el usuario con ID ${id}:`,
        error.message
      );
      throw error;
    }
    return [];
  }
};

// 7. Actualizar perfil del usuario autenticado (Protegida)
export const updateProfile = async (profileData: IUsuario) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ ...profileData }),
    });

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al actualizar el perfil:", error.message);
      throw error;
    }
    return [];
  }
};
*/
