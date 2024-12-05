
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch para crear una inscripción
export const createInscripcion = async (usuarioId: string, claseId: string) => {
  
    const response = await fetch(`${apiUrl}/inscripciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuarioId, claseId }),
    });
  
    if (!response.ok) {
      throw response;
    }
  
    return response.json();
  };
  
  // Fetch para actualizar el estado de la inscripción
export const updateInscripcionState = async (usuarioId: string, claseId: string) => {
  
    const response = await fetch(`${apiUrl}/inscripciones/${usuarioId}/${claseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al actualizar la inscripción");
    }
  
    return response.json();
  };
  

  // Fetch para obtener las inscripciones de un usuario con las clases asociadas
export const fetchInscripcionesConClase = async (usuarioId: string) => {
    const response = await fetch(`${apiUrl}/inscripciones/usuario/${usuarioId}`);
  
    if (!response.ok) {
      throw new Error("Error al obtener las inscripciones con clases");
    }
  
    return response.json();
  };

  
  