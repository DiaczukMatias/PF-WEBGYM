"use client";
import { registerPost } from "@/helpers/user.fetchFunction";
//import { registerPost } from "@/helpers/Fetch/FetchUsers";
import { validateRegisterForm } from "@/helpers/validate/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/IRegister";
import React, { useEffect, useState } from "react";
import styles from "@/views/Register/Register.module.css";

import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const RegisterView: React.FC = () => {
  const router = useRouter();
  const initialState = {
    nombre: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    edad: "",
    telefono: "",
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterErrors>(initialState);
  const [inputBlur, setInputBlur] = useState(initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setInputBlur({ ...inputBlur, [name]: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.keys(errors).length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hay errores en el formulario",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
      return;
    }

    const formattedDataUser = {
      ...dataUser,
      edad: Number(dataUser.edad),
      telefono: Number(dataUser.telefono),
    };

    // setIsSubmitting(true);
    try {
      const result = await registerPost(formattedDataUser);
      console.log("console log del resultado: " + result);

      if (result && result.usuarioId) {
        router.push("/login");
      }
    } catch (error) {
      console.log("errores en el registro", error);
      console.error("Error en el registro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
    console.log(dataUser);
  }, [dataUser]);

  useEffect(() => {
    setIsSubmitDisabled(Object.keys(errors).length > 0 || isSubmitting); // Desactivar si hay errores o está enviando
  }, [errors, isSubmitting]);

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <div>
          <h2 className={styles.h2}>Regístrate en FORGEFIT</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label htmlFor="name" className={styles.label}></label>
            <input
              id="name"
              name="nombre"
              type="text"
              value={dataUser.nombre}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Nombre"
              className={styles.inputField}
            />
            <br />
            {inputBlur.nombre && errors.nombre && (
              <span className={styles.errorMessage}>{errors.nombre}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email-adress" className={styles.label}></label>
            <input
              id="email-adress"
              name="email"
              type="email"
              value={dataUser.email}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Email"
              className={styles.inputField}
            />
            <br />
            {inputBlur.email && errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className={styles.label}></label>
            <input
              id="password"
              name="contrasena"
              type="password"
              value={dataUser.contrasena}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Contraseña"
              className={styles.inputField}
            />
            <br />
            {inputBlur.contrasena && errors.contrasena && (
              <span className={styles.errorMessage}>{errors.contrasena}</span>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="repeatPassword" className={styles.label}></label>
            <input
              id="repeatPassword"
              name="confirmarContrasena"
              type="password"
              value={dataUser.confirmarContrasena}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Repetir Contraseña"
              className={styles.inputField}
            />
            <br />
            {inputBlur.confirmarContrasena && errors.confirmarContrasena && (
              <span className={styles.errorMessage}>
                {errors.confirmarContrasena}
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className={styles.label}></label>
            <input
              id="phone"
              name="telefono"
              type="tel"
              value={dataUser.telefono}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Teléfono"
              className={styles.inputField}
            />
            <br />
            {inputBlur.telefono && errors.telefono && (
              <span className={styles.errorMessage}>{errors.telefono}</span>
            )}
          </div>

          {/* Edad */}
          <div>
            <label htmlFor="age" className={styles.label}></label>
            <input
              id="age"
              name="edad"
              type="number"
              value={dataUser.edad}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Edad"
              className={styles.inputField}
            />
            <br />
            {inputBlur.edad && errors.edad && (
              <span className={styles.errorMessage}>{errors.edad}</span>
            )}
          </div>

          <div>
            <Link href="/login">¿Ya tienes una cuenta? Ingresa acá!</Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={styles.submitButton}
          >
            {isSubmitting ? "Enviando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterView;
