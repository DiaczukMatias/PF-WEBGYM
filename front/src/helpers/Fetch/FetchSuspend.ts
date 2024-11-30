
const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export const suspendClase = async ( id: string, estado: boolean, accesToken :string) => {


  const response = await fetch(`${apiUrl}/clases/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesToken}`,
    },
    body: JSON.stringify({estado}),
  });

  if (!response.ok) {
    throw new Error("Error al suspender la clase");
  }

  return response.json();
};


export const suspendCategoria = async (id: string, accesToken :string) => {
  //const token = authToken();


  const response = await fetch(`${apiUrl}/categorias/suspend/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accesToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al cambiar el estado de la categoría");
  }

  return response.json();
};


// Función para obtener las clases suspendidas
export const fetchGetSuspendedClases = async (accesToken :string) => {
  //const token = authToken();


  const response = await fetch(`${apiUrl}/clases/suspend`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accesToken}`, // Agrega el token al header para la autenticación
    },
  });

  // Manejo de error si la respuesta no es ok
  if (!response.ok) {
    throw new Error("Error al obtener las clases suspendidas");
  }

  // Retorna los datos de la respuesta en formato JSON
  return response.json();
};


// Función para obtener las categorías suspendidas
export const fetchGetSuspendedCategorias = async (accesToken :string) => {
 // const token = authToken();


  const response = await fetch(`${apiUrl}/categorias/suspend`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accesToken}`, // Agrega el token al header para la autenticación
    },
  });

  // Manejo de error si la respuesta no es ok
  if (!response.ok) {
    throw new Error("Error al obtener las categorías suspendidas");
  }

  // Retorna los datos de la respuesta en formato JSON
  return response.json();
};