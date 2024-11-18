import { IClase } from "./IClase";

export interface ISearchParams {
    claseNombre?: string;
    perfilProfesorNombre?:string;
    categoriaNombre?: string
    descripcion?:string
  }
  
  export interface ISearchResult extends Omit<IClase, "inscripciones" | "perfilProfesor"> {
    // Opcional: Excluir propiedades que no siempre vengan en la búsqueda
    perfilProfesorNombre?: string; // Opcional si solo se requiere el nombre del profesor
  }