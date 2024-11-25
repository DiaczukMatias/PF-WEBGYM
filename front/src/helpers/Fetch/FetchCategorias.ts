import { ICategoria } from "@/interfaces/ICategory";
import { IClase } from "@/interfaces/IClase";
import { Token } from "../accestoke";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



/**
 * Obtiene todas las categorías (ruta pública)
 * @returns {Promise<ICategoria[]>} Array de categorías
 */
export const getCategories = async (): Promise<ICategoria[]> => {
  try {
    const response = await fetch(`${apiUrl}/categorias`);
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
 * @param {string} nombre- Datos de la categoría
*  @returns {Promise<ICategoria>} Categoría creada
 */
export const createCategoria = async (
  nombre: string,
): Promise<ICategoria> => {
  try {
    const response = await fetch(`${apiUrl}/categorias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(nombre),
    });
    if (!response.ok) {
      throw new Error("Error al crear la categoría.");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      console.log("token enviado crear categoria", Token)
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
): Promise<ICategoria> => {
  try {
    const response = await fetch(`${apiUrl}/categorias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
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
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/categorias/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Token}`,
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
