export interface ISearchParams {
    claseNombre?: string;
    perfilProfesorNombre?:string;
    categoriaNombre?: string
    descripcion?:string
  }
  
export  interface ISearchResult {
    id: number;
    nombre: string;
    descripcion: string;
    // Agregar mas propiedades x respuesta de la API
  }