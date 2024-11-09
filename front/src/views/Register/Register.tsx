"use client";

import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/IRegister";
import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Link from "next/link";

const RegisterView: React.FC = () => {
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
    // Agregar lógica para el envío de datos de registro aquí
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  useEffect(() => {
    setIsSubmitDisabled(Object.keys(errors).length > 0);
  }, [errors]);

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.h2}>Regístrate en FORGEFIT</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* nombre */}
        <div>
          <label htmlFor="name" className={styles.label}></label>
          <input
            id="name"
            name="name"
            type="text"
            value={dataUser.nombre}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="Nombre"
            className={styles.inputField}
          />
<<<<<<< HEAD
          <br/>
          {inputBlur.nombre && errors.nombre && (
            <span className={styles.errorMessage}>{errors.nombre}</span>
=======
          <br />
          {inputBlur.name && errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
>>>>>>> 4aa039918b4ce165189cb21cb095ae7b421ac832
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

        {/* contraseña*/}
        <div>
          <label htmlFor="password" className={styles.label}></label>
          <input
            id="password"
            name="password"
            type="password"
            value={dataUser.contrasena}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="Contraseña"
            className={styles.inputField}
          />
<<<<<<< HEAD
          <br/>
          {inputBlur.contrasena && errors.contrasena && (
            <span className={styles.errorMessage}>{errors.contrasena}</span>
=======
          <br />
          {inputBlur.password && errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
>>>>>>> 4aa039918b4ce165189cb21cb095ae7b421ac832
          )}
        </div>

        {/* repetir */}
        <div>
          <label htmlFor="repeatPassword" className={styles.label}></label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            value={dataUser.confirmarContrasena}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="Repetir Contraseña"
            className={styles.inputField}
          />
<<<<<<< HEAD
          <br/>
          {inputBlur.confirmarContrasena && errors.confirmarContrasena && (
            <span className={styles.errorMessage}>{errors.confirmarContrasena}</span>
=======
          <br />
          {inputBlur.repeatPassword && errors.repeatPassword && (
            <span className={styles.errorMessage}>{errors.repeatPassword}</span>
>>>>>>> 4aa039918b4ce165189cb21cb095ae7b421ac832
          )}
        </div>

        {/* telefono */}
        <div>
          <label htmlFor="phone" className={styles.label}></label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={dataUser.telefono}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="Teléfono"
            className={styles.inputField}
          />
<<<<<<< HEAD
          <br/>
          {inputBlur.telefono && errors.telefono && (
            <span className={styles.errorMessage}>{errors.telefono}</span>
=======
          <br />
          {inputBlur.phone && errors.phone && (
            <span className={styles.errorMessage}>{errors.phone}</span>
>>>>>>> 4aa039918b4ce165189cb21cb095ae7b421ac832
          )}
        </div>

        {/* edad */}
        <div>
          <label htmlFor="age" className={styles.label}></label>
          <input
            id="age"
            name="age"
            type="number"
            value={dataUser.edad}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="Edad"
            className={styles.inputField}
          />
<<<<<<< HEAD
          <br/>
          {inputBlur.edad && errors.edad && (
            <span className={styles.errorMessage}>{errors.edad}</span>
=======
          <br />
          {inputBlur.age && errors.age && (
            <span className={styles.errorMessage}>{errors.age}</span>
>>>>>>> 4aa039918b4ce165189cb21cb095ae7b421ac832
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
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterView;
