"use client";

import React, { useState } from "react";
import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email && message) {
      setSuccess(true);
      setError("");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setError("Por favor, completa todos los campos.");
      setSuccess(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.title}>CONTACTANOS</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
            className={styles.input}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.input}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            required
            className={styles.input}
            rows={4}
          />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              ENVIAR MENSAJE
            </button>
          </div>
          {success && (
            <p className={styles.successMessage}>
              Mensaje enviado con éxito! Espera nuestra respuesta.
            </p>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default ContactForm;
