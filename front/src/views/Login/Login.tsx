"use client";
import { validateLoginForm } from "@/helpers/validate";
import { ILoginErrors, ILoginProps } from "@/interfaces/ILogin";
import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";

const LoginView = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
   console.log('handleSubmit')
  };

  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.h2}>Sign in to NOMBREDELGYM</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-adress"></label>
          <input
            id="email-adress"
            name="email"
            type="email"
            value={dataUser.email}
            onChange={handleChange}
            placeholder="johndoe@gmail.com"
            className={styles.inputField}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            value={dataUser.password}
            onChange={handleChange}
            placeholder="**********"
            className={styles.inputField}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <a href="/register">You dont have an account? Create account</a>
        </div>

        <button
          disabled={errors.email || errors.password ? true : false}
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
