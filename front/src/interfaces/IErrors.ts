export interface FetchError {
    message: string; // Mensaje de error
    status?: number; // Código de estado HTTP opcional
    error?: string;  // Descripción adicional del error opcional
  }