import { getCategories } from "@/helpers/Fetch/FetchCategorias";

export const validateCrearCategoria = async (nombre: string,  accessToken: string): Promise<string | null> => {
  if (!nombre.trim()) {
    return "El nombre de la categoría es obligatorio.";
  }
  if (nombre.length > 100) {
    return "El nombre de la categoría no puede exceder los 30 caracteres.";
  }
  if (nombre.length < 3) {
    return "El nombre de la categoría no puede menos de 3 caracteres.";
  }

  try {
    const categorias = await getCategories(accessToken);
    const categoriaExistente = categorias.find(
      (categoria) => categoria.nombre.toLowerCase() === nombre.toLowerCase().trim()
    );
    if (categoriaExistente) {
      return `La categoría "${nombre}" ya existe.`;
    }
  } catch (error) {
    console.error("Error al validar el nombre con las categorías existentes:", error);
    return "Hubo un error al verificar las categorías existentes.";
  }

  return null;
};

