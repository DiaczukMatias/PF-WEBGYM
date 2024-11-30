"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/helpers/validate/validate";
import styles from "./Login.module.css";
import { ILoginProps, ILoginErrors } from "@/interfaces/ILogin";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginView: React.FC = () => {
  const initialState = { email: "", contrasena: "" };
  const [loginForm, setLoginForm] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>({});
  const [inputBlur, setInputBlur] = useState<{ email: boolean; contrasena: boolean }>({
    email: false,
    contrasena: false,
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const router = useRouter();

  // Maneja los cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setErrors(validateLoginForm({ ...loginForm, [name]: value }));
  };

  // Maneja el blur en los inputs
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setInputBlur({ ...inputBlur, [name]: true });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: loginForm.email,
        contrasena: loginForm.contrasena,
        redirect: false,
      });

      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas",
          customClass: {
            confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
            }}
        });
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  // Maneja el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google", { redirect: false });
      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en el inicio de sesión con Google",
          customClass: {
            confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
            }}
        });
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
    }
  };

  // Actualiza el estado del botón de envío
  useEffect(() => {
    setIsSubmitDisabled(Object.keys(errors).length > 0);
  }, [errors]);

  return (
    <main className={styles.main}>
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
            {inputBlur.email && errors.email && (
              <span className={styles.errorText}>*{errors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="password"></label>
            <input
              id="password"
              name="contrasena"
              type="password"
              value={loginForm.contrasena}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="**********"
              className={styles.inputField}
            />
            {inputBlur.contrasena && errors.contrasena && (
              <span className={styles.errorText}>*{errors.contrasena}</span>
            )}
          </div>

          <div>
            <Link href="/register">No tienes una cuenta? Crea una!</Link>
          </div>

          <button
            disabled={isSubmitDisabled}
            type="submit"
            className={styles.submitButton}
          >
            INGRESA
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`${styles.googleButton} text-white py-2 px-4 rounded mt-4 border border-white`}
          >
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginView;