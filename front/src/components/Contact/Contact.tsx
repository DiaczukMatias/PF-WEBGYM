// "use client"
// import React, { useState } from 'react';

// const ContactForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Aqui manejar la logica de envio mas adelante
//     if (name && email && message) {
//       // Suponiendo que el envio es exitoso
//       setSuccess(true);
//       setError('');

//       // Restablecer los campos
//       setName('');
//       setEmail('');
//       setMessage('');
//     } else {
//       setError('Por favor, completa todos los campos.');
//       setSuccess(false);
//     }
//   };

//   return (
//     <div>
//        <p className="text-center text-sm font-extralight text-secondary m-8">Si tienes alguna pregunta, por favor completa el formulario a continuación y nos pondremos en contacto contigo pronto.</p>
//     <form onSubmit={handleSubmit} className="w-3/4 mx-auto bg-transparent border border-accent rounded-lg m-4 p-4 md:w-2/3 lg:w-1/2">
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="border border-secondary rounded-md w-full p-2 bg-transparent text-secondary2"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="border border-secondary rounded-md w-full p-2 bg-transparent text-secondary2"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1" htmlFor="message">Mensaje</label>
//         <textarea
//           id="message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           required
//           className="border border-secondary rounded-md w-full p-2 bg-transparent text-secondary2"
//           rows={4}
//         />
//       </div>
//       <div className='flex justify-center'>
//         <button type="submit" className="bg-accent border border-accent text-primary font-semibold rounded-md p-4">
//         Enviar Mensaje
//       </button>
//       </div>
//       {success && <p className="text-green-500 mt-4">Mensaje enviado con éxito! Espera nuestra respuesta.</p>}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </form>
//     </div>
//   );
// };

// export default ContactForm;

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
