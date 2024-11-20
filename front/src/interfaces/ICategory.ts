

import { IClase } from "./IClase";

export interface ICategoria {
  id: string;
  nombre: string;
  clases?: IClase[];
}
