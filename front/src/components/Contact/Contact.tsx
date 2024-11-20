"use client";

import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import emailjs from "emailjs-com";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email && message) {
      const templateParams = {
        from_name: name,
        from_email: email,
        mensaje: message,
        user_email: email,
      };

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
        )
        .then(
          () => {
            setSuccess(true);
            setError("");
            setName("");
            setEmail("");
            setMessage("");
          },
          (error) => {
            console.error("EmailJS error:", error);
            setError("Hubo un error al enviar el mensaje. Intenta nuevamente.");
            setSuccess(false);
          }
        );
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
