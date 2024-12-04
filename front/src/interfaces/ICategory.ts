
import { IClase } from "@/interfaces/IClase";

export interface ICategoria {
  id: string;
  nombre: string;
  clases?: IClase[];
  estado?: boolean;  
  imagen?: string;

}
