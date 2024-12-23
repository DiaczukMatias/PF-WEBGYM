import { IClase } from "@/interfaces/IClase";
import { ISearchParams, ISearchResult } from "@/interfaces/ISearch";
import { FetchError } from "@/interfaces/IErrors";

export function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as FetchError).message === "string"
  );
}  

  
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


// Fetch para crear una nueva clase
export const createClase = async ( formData: FormData, accessToken :string) => {

  const response = await fetch(`${apiUrl}/clases`, {
    method: "POST",
    headers: {
      // No necesitamos especificar Content-Type cuando usamos FormData
      // El navegador se encarga de añadir el encabezado adecuado
      Authorization: `Bearer ${accessToken}`
    },
    body: formData, // Directamente el FormData aquí
  });
  console.log('respuestas del servidor', response);
  
  if (!response.ok ) {
    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);;
  }
  return response
};

// Fetch para actualizar una clase existente
export const updateClase = async (id: string, form : FormData, accessToken :string) => {
 
try {
  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: form,
  });
  if (!response.ok) {
    console.error('que recibo en mi objeto:', form);
    const errorResponse = await response.json(); // Captura la respuesta de error
    const errorMessages = errorResponse.message || 'Ha ocurrido un error desconocido';
    throw new Error(errorMessages); // Lanzamos un error con el mensaje del backend
  }
  return await response.json(); // Si todo está bien, retornar los datos de la respuesta
} catch (error: unknown) {
  if (isFetchError(error)) {
    console.error("Error al actualizar la clase:", error.message);
    throw new Error(error.message); // Mostrar el error con mejor visibilidad
  }
  console.error("Error desconocido:", error);
    throw new Error("Ha ocurrido un error desconocido");
}
  
};



export const fetchClaseById = async (id: string): Promise<IClase> => {
  const response = await fetch(`${apiUrl}/clases/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener la clase");
  }
  return response.json();
};

export const fetchClases = async () => {
  const response = await fetch(`${apiUrl}/clases/activas`,); // 
  if (!response.ok) {
    throw new Error("Error al obtener las clases");
  }
  return response.json();
};

/*export const searchClases = async (
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
  };*/
  
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
 }

  export const fetchTodasClases = async ( page: number, limit: number, accesToken :string) => {
   
     // Validación de page y limit para asegurarse de que son números positivos
  if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
    console.error("Los parámetros 'page' y 'limit' deben ser números positivos.");
    return []; // Retorna un array vacío si los parámetros son inválidos
  }

   try { 
    const response = await fetch(`${apiUrl}/clases?page=${page}&limit=${limit}`,{ 
        method: "GET",
        headers: {
          Authorization: `Bearer ${accesToken}`
        },
      });
      if (!response.ok) {
        console.error(`Error en la respuesta: ${response.status} - ${response.statusText}`);
        throw new Error('Error al obtener las clases');
      }
      return response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al buscar clases:", error.message);
      } else {
        console.error("Error desconocido al buscar clases");
      }
      return []; 
    }
    };
  
    export const fetchIncripcionesClases = async () => {
      const response = await fetch(`${apiUrl}/clases/clase/{claseID}`,); // es nesecasio poner el page y el limit x como esta configurado el back, si no se rompe xq al no pasarlo pone de skip null o undefides y si o si tiene q ser nuemrico
    
      if (!response.ok) {
        throw new Error("Error al obtener las clases");
      }
      return response.json();
    };
    
