import { IClase } from "@/interfaces/IClase";
import { ISearchParams, ISearchResult } from "@/interfaces/ISearch";
import { Token } from "../accestoke";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch para crear una nueva clase
export const createClase = async (formData: FormData) => {
  if (!Token) throw new Error("Usuario no autenticado");

  const response = await fetch(`${apiUrl}/clases`, {
    method: "POST",
    headers: {
      // No necesitamos especificar Content-Type cuando usamos FormData
      // El navegador se encarga de añadir el encabezado adecuado
    },
    body: formData, // Directamente el FormData aquí
  });

  if (!response.ok) {
    throw new Error("Error al crear la clase");
  }
  return response.json();
};

// Fetch para actualizar una clase existente
export const updateClase = async (id: string, updatedClase: IClase) => {
  if (!Token) throw new Error("Usuario no autenticado");

  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify(updatedClase),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la clase");
  }
  return response.json();
};

export const suspendClase = async (id: string) => {
  if (!Token) throw new Error("Usuario no autenticado");

  const response = await fetch(`${apiUrl}/clases/suspend/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al suspender la clase");
  }

  return response.json();
};

export const fetchClaseById = async (id: string): Promise<IClase> => {
  const response = await fetch(`${apiUrl}/clases/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener la clase");
  }
  return response.json();
};

export const fetchClases = async () => {
  const response = await fetch(`${apiUrl}/clases/activas`,); // es nesecasio poner el page y el limit x como esta configurado el back, si no se rompe xq al no pasarlo pone de skip null o undefides y si o si tiene q ser nuemrico

  if (!response.ok) {
    throw new Error("Error al obtener las clases");
  }
  return response.json();
};

export const searchClases = async (
  params: ISearchParams
): Promise<ISearchResult[]> => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al buscar clases:", error.message);
      } else {
        console.error("Error desconocido al buscar clases");
      }
      return []; // Manejamos cualquier error devolviendo un array vacío
    }

    const data: ISearchResult[] = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al buscar clases:", error.message);
    } else {
      console.error("Error desconocido al buscar clases");
    }
    return []; // Manejamos cualquier error devolviendo un array vacío
  }
};
