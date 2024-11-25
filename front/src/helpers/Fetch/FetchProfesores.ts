const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchProfesoresConClases = async () => {
const response = await fetch(`${apiUrl}/perfilProfesor/clase`);
    if (!response.ok) {
      throw new Error('Error al obtener los profesores con sus clases');
    }
    return response.json();
  };

