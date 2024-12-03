import { ICategoria } from "@/interfaces/ICategory";
import { IClase } from "@/interfaces/IClase";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;



/**
 * Obtiene todas las categorías (ruta pública)
 * @returns {Promise<ICategoria[]>} Array de categorías
 */
export const getCategories = async (accesToken: string): Promise<ICategoria[]> => {
  try {
    const response = await fetch(`${apiUrl}/categorias`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las categorías.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    console.error("Error desconocido al obtener categorías");
    return []; // Retorna un array vacío en caso de error
  }
};

/**
 * Obtiene una categoría por ID (ruta pública)
 * @param {string} id - ID de la categoría
 * @returns {Promise<ICategoria>} Categoría encontrada
 */
export const getCategoryById = async (id: string): Promise<ICategoria> => {
  try {
    const response = await fetch(`${apiUrl}/categorias/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener la categoría con ID ${id}.`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    return {} as ICategoria; // Retorna un objeto vacío en caso de error
  }
};

/**
 * Crea una nueva categoría (ruta protegida)
 * @param {string} nombre Datos de la categoría
*  @returns {Promise<ICategoria>} Categoría creada
 */
export const createCategoria = async (formData: FormData, token: string): Promise<ICategoria> => {
  try {
    const response = await fetch(`${apiUrl}/categorias`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al crear la categoría.");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al crear categoría:", error.message);
      throw error;
    }
    return {} as ICategoria; // Retorna un objeto vacío en caso de error
  }
};


/**
 * Actualiza una categoría existente por ID (ruta protegida)
 * @param {string} id - ID de la categoría
 * @param {ICategoria} categoryData - Nuevos datos de la categoría
 * @returns {Promise<ICategoria>} Categoría actualizada
 */
export const updateCategory = async (
  id: string,
  categoryData: ICategoria, 
  accesToken :string
): Promise<ICategoria> => {
  //const token = authToken();
  
  if (!accesToken) throw new Error("Usuario no autenticado");

  try {
    const response = await fetch(`${apiUrl}/categorias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesToken}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar la categoría con ID ${id}.`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    return {} as ICategoria; // Retorna un objeto vacío en caso de error
  }
};

/**
 * Elimina una categoría por ID (ruta protegida)
 * @param {string} id - ID de la categoría
 * @returns {Promise<void>} Confirmación de eliminación
 */
export const deleteCategory = async ( id: string, accesToken :string): Promise<void> => {
 // const token = authToken();

  
  if (!accesToken) throw new Error("Usuario no autenticado");

  try {
    const response = await fetch(`${apiUrl}/categorias/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la categoría con ID ${id}.`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
  }
};

/**
 * Obtiene las clases asociadas a una categoría específica (ruta pública)
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise<any[]>} Array de clases asociadas
 */
export const getClassesByCategory = async (categoryId: string): Promise<IClase[]> => {
  try {
    const response = await fetch(
      `${apiUrl}/categorias/${categoryId}/clases`
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener las clases de la categoría con ID ${categoryId}.`
      );
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    return []; // Retorna un array vacío en caso de error
  }
};



// hacer fetch falta del back:

//@Get('activas')

 // Obtiene todas las categorías (ruta pública)


export const getCategoriesActivas = async (): Promise<ICategoria[]> => {
  const response = await fetch(`${apiUrl}/categorias/activas`);

  if (!response.ok) {
    throw new Error("Error al obtener las cayegorias activas");
  }
  return response.json();
};


//@Get(':id/activas')

// Obtiene unacategoría activa x id (ruta pública)


export const getCategoriaById = async (id: string): Promise<ICategoria[]> => {
  const response = await fetch(`${apiUrl}/categorias/${id}/activas`);

  if (!response.ok) {
    throw new Error("Error al obtener las cayegorias activas");
  }
  return response.json();
};
//  @Patch(':id/estado')  esta en el fetch suspended   
   // = suspendCategoria 