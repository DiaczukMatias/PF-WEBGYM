
export const validateNombre = (nombre: string): string | null => {
    if (!nombre.trim()) return "El nombre de la categoría es obligatorio.";
    if (nombre.length > 100) return "El nombre de la categoría no puede exceder los 100 caracteres.";
    return null;
  };
  