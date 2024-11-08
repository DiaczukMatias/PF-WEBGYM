import { ILoginProps } from "@/interfaces/ILogin";
import Swal from "sweetalert2";
import { temporalLogin } from "./datatemporal";

export const fetchLogin = async (userData: ILoginProps) => {
  // Lógica temporal de comparación
  if (
    userData.email === temporalLogin.email &&
    userData.password === temporalLogin.password
  ) {
    // Simulando una respuesta exitosa del servidor
    return {
      status: 200,
      message: "Login exitoso",
      userData: {
        email: temporalLogin.email,
        name: "Usuario de Prueba",
        token: "token-simulacion",
      },
    };
  } else {
    // Simulando una respuesta de error
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email o contraseña incorrectos",
    });
    throw new Error("Email o contraseña incorrectos");
  }

  /* 
  // Código de llamada a la API real (comentado para futuro uso)
  try {
    const response = await fetch(`/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.description,
      });
      throw new Error(data.description);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
  */
};
