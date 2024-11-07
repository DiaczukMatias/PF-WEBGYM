"use client";

import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/IRegister";
import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";

const RegisterView = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterErrors>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.h2}>Sign up to NOMBREDELGYM</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-adress" className={styles.label}></label>
          <input
            id="email-adress"
            name="email"
            type="email"
            value={dataUser.email}
            onChange={handleChange}
            placeholder="johndoe@gmail.com"
            className={styles.inputField}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div>
          <label htmlFor="password-adress" className={styles.label}></label>
          <input
            id="password"
            name="password"
            type="password"
            value={dataUser.password}
            onChange={handleChange}
            placeholder="**********"
            className={styles.inputField}
          />
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={styles.label}></label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={dataUser.phone}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Phone"
          />
          {errors.phone && (
            <span className={styles.errorMessage}>{errors.phone}</span>
          )}
        </div>

        <div>
          <label htmlFor="address" className={styles.label}></label>
          <input
            id="address"
            name="address"
            type="address"
            value={dataUser.address}
            onChange={handleChange}
            className={styles.formGroup}
            placeholder="Adress"
          />
          {errors.address && (
            <span className={styles.errorMessage}>{errors.address}</span>
          )}
        </div>

        <div>
          <label htmlFor="name" className={styles.label}></label>
          <input
            id="name"
            name="name"
            type="text"
            value={dataUser.name}
            onChange={handleChange}
            placeholder="Name"
            className={styles.inputField}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>
        <div>
          <a href="/login">Do you have an account? Sign in</a>
        </div>
        <button
          disabled={errors.email ? true : false}
          type="submit"
          className={styles.submitButton}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default RegisterView;
