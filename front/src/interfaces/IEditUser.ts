export interface IEditUserErrors {
    nombre?: string;
    email?: string;
   
    telefono?: number |string;
    edad?: number |string;
    image?: File | null;
    rol?: string
  }
  
  export interface IEditUserProps {
    nombre: string;
    email: string;
    
    telefono: number | string;
    edad: number | string;
    image?: File | null;
    rol?: string
  }
  