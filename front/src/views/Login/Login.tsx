"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/helpers/validate/validate";
import styles from "./Login.module.css";
import { ILoginProps, ILoginErrors } from "@/interfaces/ILogin";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginView: React.FC = () => {
  const initialState = { email: "", contrasena: "" };
  const [loginForm, setLoginForm] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>(initialState);
  const [inputBlur, setInputBlur] = useState(initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  // const { data: session } = useSession();
  const router = useRouter();

  console.log(session?.user);
  

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

    // Inicia el proceso de signIn
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
      // Redirige al perfil inmediatamente
      router.push("/profileUsers");
    }
  };


  /*  // useEffect para guardar la sesión en localStorage cuando esté lista
  useEffect(() => {
    if (session?.user?.accessToken) {
      const userSession = {
        token: session.user.accessToken,
        user: session.user,
      };
      localStorage.setItem("userSession", JSON.stringify(userSession));
    }
  }, [session]);
  */

  // Handler para el inicio de sesión con Google rol cliente
  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google", { redirect: false });
      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en el inicio de sesión con Google",
        });
      } else {
        router.push("/profileUsers");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión con Google", error);

    }

 // Handler para el inicio de sesión con Google rol profesor
/* const handleGoogleLogin = async () => {
  try {
    const res = await signIn("google", { redirect: false });
    if (res?.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el inicio de sesión con Google",
      });
    } else {
      router.push("/profile");
    }
  };  */

  // Effect to manage submit button state
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
            <br />
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
            <br />
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
            className=" text-white py-2 px-4 rounded mt-4 border border-white"
          >
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginView;
