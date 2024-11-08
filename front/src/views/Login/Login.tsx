"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/helpers/validate";
import styles from "./Login.module.css";
import { ILoginProps, ILoginErrors } from "@/interfaces/ILogin";
import { fetchLogin } from "@/helpers/user.fetchFunction";
import Swal from "sweetalert2";

const LoginView : React.FC = () => {
  const initialState = { email: "", contrasena: "" };
  const [loginForm, setLoginForm] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>(initialState);
  const [inputBlur, setInputBlur] = useState(initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  


  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setErrors(validateLoginForm({ ...loginForm, [name]: value }));
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setInputBlur({ ...inputBlur, [name]: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Llamada a la función fetchLogin
      const userloged = await fetchLogin(loginForm);
  
      // Verificación de estado de respuesta
      if (userloged && userloged.status === 200) {
        // Almacenar token en localStorage
        localStorage.setItem("userToken", userloged.userData.token);
  
        // Mensaje de confirmación opcional
        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: `Bienvenido, ${userloged.userData.name}`,
        });
  
        // Futura redirección 
        
      }
    } catch (error) {
      // Manejador de errores
      console.error("Error en el inicio de sesión:", error);
      
    }
  };

  // Effect to manage submit button state
  useEffect(() => {
    setIsSubmitDisabled(Object.keys(errors).length > 0);
  }, [errors]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.h2}>Ingresa en FORGEFIT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-address"></label>
          <input
            id="email-address"
            name="email"
            type="email"
            value={loginForm.email}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="johndoe@gmail.com"
            className={styles.inputField}
          />
          <br/>
          {inputBlur.email && errors.email && <span className={styles.errorText}>*{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            value={loginForm.contrasena}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="**********"
            className={styles.inputField}
          />
          <br/>
          {inputBlur.contrasena && errors.contrasena && <span className={styles.errorText}>*{errors.contrasena}</span>}
        </div>

        <div>
          <Link href="/register">No tienes una cuenta? Crea una!</Link>
        </div>

        <button
          disabled={isSubmitDisabled}
          type="submit"
          className={styles.submitButton}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginView;
