"use client"
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui manejar la logica de envio mas adelante
    if (name && email && message) {
      // Suponiendo que el envio es exitoso
      setSuccess(true);
      setError('');
      
      // Restablecer los campos
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setError('Por favor, completa todos los campos.');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/4 mx-auto bg-secondary2 border border-b-accent m-4 p-4 md:w-2/3 lg:w-1/2">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-secondary rounded-md w-full p-2 text-secondary"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-secondary rounded-md w-full p-2 text-secondary"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="border border-secondary rounded-md w-full p-2 text-secondary"
          rows={4}
        />
      </div>
      <div className='flex justify-center'>
        <button type="submit" className="bg-accent2 border border-accent text-black rounded-md p-4">
        Enviar Mensaje
      </button>
      </div>
      {success && <p className="text-green-500 mt-4">Mensaje enviado con éxito! Espera nuestra respuesta.</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default ContactForm;
