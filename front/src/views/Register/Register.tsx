"use client";
import { registerPost } from "@/helpers/user.fetchFunction";
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
    imagen: undefined,
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [inputBlur, setInputBlur] = useState<Partial<IRegisterProps>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setDataUser((prevState) => ({
      ...prevState,
      [name]: name === "imagen" && files ? files[0] : value, // Si es el campo de imagen, guarda el archivo.
    }));
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
            popup.style.backgroundColor = '#333'; // Fondo oscuro
            popup.style.color = 'white'; // Texto blanco         
             }}
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
  const file = formData.get("imagen") as File | null;

  const userData = {
    nombre: formData.get("nombre") as string,
    email: formData.get("email") as string,
    contrasena: formData.get("contrasena") as string,
    confirmarContrasena: formData.get("confirmarContrasena") as string,
    edad: Number(formData.get("edad")),
    telefono: Number(formData.get("telefono")),
  };
    try {
      const result = await registerPost(userData, file || undefined);
      console.log("console log del resultado: " , result);

      if (result) {
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
          {/* Imagen */}
          <div>
            <label htmlFor="age" className={styles.label}></label>
            <input
              id="imagen"
              name="imagen"
              type="file"
              accept="image/*"
              onChange={handleChange}
              onBlur={handleInputBlur}              
              className={styles.inputField}
            />
            <br />
            {inputBlur.imagen && errors.imagen && (
  <span className={styles.errorMessage}>{errors.imagen}</span>
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
