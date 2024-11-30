import { IPerfilProfesor } from "@/interfaces/IProfesor";
//import { authToken } from "../accestoke";
//import { useSession } from "next-auth/react";



const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchProfesoresConClases = async () => {
const response = await fetch(`${apiUrl}/perfilProfesor/clase`);
    if (!response.ok) {
      throw new Error('Error al obtener los profesores con sus clases');
    }
    return response.json();  // La respuesta es un array de perfiles de profesor con clases
  };



export const fetchPerfilProfesores = async () => {
  try {
    const response = await fetch(`${apiUrl}/perfilProfesor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los perfiles de los profesores");
    }

    const data = await response.json();
    return data; // La respuesta debe ser un array de objetos de perfil de profesor
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPerfilProfesorById = async  (usuarioId: string): Promise<IPerfilProfesor> => {
  try {
    const response = await fetch(`${apiUrl}/perfilProfesor/${usuarioId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el perfil del profesor');
    }
    return response.json(); // La respuesta es un objeto con el perfil de profesor
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchClasesPorProfesor = async (perfilProfesorId: string) => {
  try {
    const response = await fetch(`${apiUrl}/perfilProfesor/${perfilProfesorId}/clases`);
    if (!response.ok) {
      throw new Error('Error al obtener las clases del profesor');
    }
    return response.json(); // La respuesta es un array de clases
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearPerfilProfesor = async ( usuarioId:string, formData: FormData, accessToken: string ) => {


    const response = await fetch(`${apiUrl}/perfilProfesor/${usuarioId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Error al crear el perfil de profesor');
    }
    return response.json(); // La respuesta es el perfil creado
  };


  export const modificarPerfilProfesor = async (id:string, formData: FormData) => {
    
      const response = await fetch(`${apiUrl}/perfilProfesor/${id}`, {
        method: 'PUT',
        headers: {
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil de profesor');
      }
      return response.json(); // La respuesta es el perfil modificado
  };
  