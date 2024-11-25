const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchProfesoresConClases = async () => {
const response = await fetch(`${apiUrl}/perfilProfesor/clase`);
    if (!response.ok) {
      throw new Error('Error al obtener los profesores con sus clases');
    }
    return response.json();
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

