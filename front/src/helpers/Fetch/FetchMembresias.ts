import { IMembresia } from "@/interfaces/IMembresia";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/*interface IMembresiaData {
  nombre: string;
  precio: number;
  duracionEnMeses: number;
}
*/

// Crear una nueva Membresía (Admin)
export const crearMembresia = async (membresia: IMembresia) => {
  try {
    const response = await fetch(`${apiUrl}/membresias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membresia),
    });
    if (!response.ok) {
      throw new Error('Error al crear la membresía');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear la membresía');
  }
};

// Comprar una Membresía (Usuario Autenticado)
export const comprarMembresia = async (
  usuarioId: string,
  membresiaId: string,
  accesToken :string
) => {
//  const token = authToken();

  if (!accesToken) {
    console.error("No se encontró token de autorización", accesToken);
    return null;
  }
  try {
    const response = await fetch(`${apiUrl}/membresias/${membresiaId}/compra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify({ usuarioId }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al realizar la compra");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener Membresías Paginadas
export const obtenerMembresias = async (page: number, limit: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/membresias?page=${page}&limit=${limit}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al obtener las membresías");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener Historial de Membresías de un Usuario Específico
export const obtenerHistorialMembresias = async ( usuarioId: string, accesToken :string) => {
 // const token = authToken();
  
  if (!accesToken) throw new Error("Usuario no autenticado");

  try {
    const response = await fetch(
      `${apiUrl}/membresias/${usuarioId}/historial`,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////
// Obtener Historial de Membresías (Admin)
export const obtenerHistorialMembresiasAdmin = async (accesToken :string) => {

  
  if (!accesToken) throw new Error("Usuario no autenticado");
 try {
    const response = await fetch(`${apiUrl}/membresias/admin/historial`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("No tienes permisos para acceder a este historial");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener Membresía Activa de un Usuario
export const obtenerMembresiaActiva = async (usuarioId: string, accesToken: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/membresias/membresia/activa/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener Membresías Inactivas (Admin)
export const obtenerMembresiasInactivas = async (accesToken :string) => {
  //const token = authToken();

  if (!accesToken) {
    console.error("No se encontró token de autorización");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/membresias/pag/inactivas`, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al obtener las membresías inactivas");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Desactivar Membresía (Admin)
export const desactivarMembresia = async ( nombre: string, accesToken :string) => {
 // const token = authToken();

  if (!accesToken) {
    console.error("No se encontró token de autorización");
    return null;
  }
  try {
    const response = await fetch(`${apiUrl}/membresias/desactivar/${nombre}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al desactivar la membresía");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar Precio de Membresía (Admin)
export const actualizarPrecioMembresia = async (
  membresiaId: string,
  nuevoPrecio: number,
  accesToken :string
) => {
  //const token = authToken();

  if (!accesToken) {
    console.error("No se encontró token de autorización");
    return null;
  }
  try {
    const response = await fetch(`${apiUrl}/membresias/${membresiaId}/precio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify({ precio: nuevoPrecio }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al actualizar el precio");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/////////////////////////////////////////////////////////////////////////////////////////
// Renovar Membresía (Admin o Usuario) no protegida
export const renovarMembresia = async ( userId: string) => {
 // const token = authToken();

 
  try {
    const response = await fetch(`${apiUrl}/membresias/renovar/${userId}`, {
      method: "PATCH",
      
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al renovar la membresía");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cancelar Membresía Activa (Usuario)
export const cancelarMembresia = async (id: string, accesToken :string) => {
 // const token = authToken();

  if (!accesToken) {
    console.error("No se encontró token de autorización",accesToken);
    return null;
  }
  try {
    const response = await fetch(`${apiUrl}/membresias/cancelar/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al cancelar la membresía");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
