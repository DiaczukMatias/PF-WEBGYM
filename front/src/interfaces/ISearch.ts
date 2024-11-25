import { IClase } from "./IClase";
import { IProfesor } from "./IProfesor";

export interface ISearchParams {
    claseNombre?: string;
    perfilProfesorNombre?:string;
    categoriaNombre?: string
    descripcion?:string
  }
  
  export interface ISearchResult extends Omit<IClase, "inscripciones" | "perfilProfesor"> {
    // Opcional: Excluir propiedades que no siempre vengan en la búsqueda
    perfilProfesor?: IProfesor; // Opcional si solo se requiere el nombre del profesor
  }