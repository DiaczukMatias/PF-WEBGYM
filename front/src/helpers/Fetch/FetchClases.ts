import { IClase, ICrearClase } from "@/interfaces/IClase";
import { ISearchParams, ISearchResult } from "@/interfaces/ISearch";
import { getSession } from "next-auth/react";


export const fetchAuthToken = async (): Promise<string | null> => {
  const session = await getSession();
  return session?.user.accessToken || null; // Asegúrate de que `accessToken` esté en la sesión
};
const apiUrl = "http://localhost:3010"  // process.env.NEXT_PUBLIC_API_URL



// Fetch para crear una nueva clase
export const createClase = async (nuevaClase: ICrearClase) => {
  const token = await fetchAuthToken();
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${apiUrl}/clases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaClase),
  });
  if (!response.ok) {
    throw new Error('Error al crear la clase');
  }
  return response.json();
};

// Fetch para actualizar una clase existente
export const updateClase = async (id: string, updatedClase: IClase) => {
  const token = await fetchAuthToken();
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedClase),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la clase');
  }
  return response.json();
};

// Fetch para eliminar una clase
export const deleteClase = async (id: string) => {
  const token = await fetchAuthToken();
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la clase');
  }
  return response.json();
};



export const fetchClaseById = async (id: string) => {
  const response = await fetch(`${apiUrl}/clases/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener la clase');
  }
  return response.json();
};


  export const fetchClases = async () => {
    const response = await fetch(`${apiUrl}/clases`);
    if (!response.ok) {
      throw new Error('Error al obtener las clases');
    }
    return response.json();
  };
  
  export const searchClases = async (params: ISearchParams): Promise<ISearchResult[]> => {
    try {
      const response = await fetch("http://localhost:3010/clases/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }
  
      const data: ISearchResult[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error al buscar clases:", error);
      throw new Error("Error en la API de búsqueda.");
    }
  };
  