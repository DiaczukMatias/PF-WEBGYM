"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/helpers/validate";
import styles from "./Login.module.css";
import { ILoginProps, ILoginErrors } from "@/interfaces/ILogin";
//import { fetchLogin } from "@/helpers/user.fetchFunction";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';

const LoginView: React.FC = () => {

  const initialState = { email: "", contrasena: "" };
  const [loginForm, setLoginForm] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>(initialState);
  const [inputBlur, setInputBlur] = useState(initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);


  const { data: session, status } = useSession();
  console.log('sesion de usuario: ' + session?.user?.name);
  console.log('status de la sesion: ' + status);



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
      });
    } else {
      // Redirige al dashboard o donde quieras
      window.location.href = "/dashboard";
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
          <br />
          {inputBlur.email && errors.email && <span className={styles.errorText}>*{errors.email}</span>}
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
          <br />
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
          INGRESA
        </button>

        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
        >
          Iniciar sesión con Google
        </button>
      </form>
    </div>

  );
};

export default LoginView;
