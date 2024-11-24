
import { IClase, ICrearClase } from "@/interfaces/IClase";
import { ISearchParams, ISearchResult } from "@/interfaces/ISearch";
//import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";


const  Token = ( )=> {
const { data: session } = useSession();
const token = session?.user?.accessToken;
  return token
}


/*export const fetchAuthToken = async (): Promise<string | null> => {
  const session = await getSession();
  console.log("fetchAuthToke getSession", getSession)
  return session?.user.accessToken || null; // Asegúrate de que `accessToken` esté en la sesión
};
*/
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


// Fetch para crear una nueva clase
export const createClase = async (nuevaClase: ICrearClase) => {
  if (!Token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${apiUrl}/clases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`,
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
  if (!Token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`,
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
  if (!Token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${Token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la clase');
  }
  return response.json();
};



export const fetchClaseById = async (id: string) : Promise<IClase> => {
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
        const response = await fetch(`${apiUrl}/clases/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (response.status === 404) {
            console.warn("No se encontraron clases para los parámetros dados.");
            return []; // Retornamos un array vacío para manejarlo en el frontend
        }

        if (!response.ok) {
            console.error(`Error en la API: ${response.statusText}`);
            return []; // Devuelve un array vacío para evitar propagar el error
        }

        const data: ISearchResult[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error al buscar clases:", error);
        return []; // Manejamos cualquier error devolviendo un array vacío
    }
};
