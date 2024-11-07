"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/helpers/validate";
import styles from "./Login.module.css";
import { ILoginProps, ILoginErrors } from "@/interfaces/ILogin";

const LoginView = () => {
  const initialState = { email: "", password: "" };
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
    console.log('handle submit');
    
    
  };

  // Effect to manage submit button state
  useEffect(() => {
    setIsSubmitDisabled(Object.keys(errors).length > 0);
  }, [errors]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.h2}>Sign in to FORGEFIT</h2>
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
            value={loginForm.password}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder="**********"
            className={styles.inputField}
          />
          <br/>
          {inputBlur.password && errors.password && <span className={styles.errorText}>*{errors.password}</span>}
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
