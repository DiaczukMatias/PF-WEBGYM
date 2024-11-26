"use client";

import React, { useEffect, useState } from 'react';
import { fetchClaseById, updateClase } from '../../helpers/Fetch/FetchClases';
import { useSession } from 'next-auth/react';

const EditClassForm: React.FC = () => {
  
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null); 
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    disponibilidad: 0,
    imagen: '',
    categoriaId: '',
    perfilProfesorId: '',
  });
  

  // Obtén el ID de la URL en el cliente
  useEffect(() => {
    const pathname = window?.location?.pathname;
    const extractedId = pathname.split('/').pop() || '';
    setId(extractedId);
  }, []);

  // Carga los datos de la clase cuando se obtenga el ID
  useEffect(() => {
    if (id) {
      fetchClaseById(id)
        .then((claseData) => {
          // Asegúrate de que 'perfilProfesorId' esté presente en el objeto
          const updatedClaseData = {
            ...claseData,
            perfilProfesorId: claseData.perfilProfesor?.id || '', // Asigna un valor predeterminado si no está presente
            fecha: typeof claseData.fecha === 'string' ? claseData.fecha.slice(0, 16) : new Date(claseData.fecha).toISOString().slice(0, 16),
            disponibilidad: claseData.disponibilidad ?? 0, // Asigna 0 si es undefined
            imagen: claseData.imagen ?? ''
          };
          
          setFormData(updatedClaseData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar la clase:', error);
          setLoading(false);
        });
    }
  }, [id]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedFormData = {
        ...formData,
        perfilProfesorId: session?.user.id,
      };

      await updateClase(id!, updatedFormData); 
      window.location.href = '/clases'; 
    } catch (error) {
      console.error('Error al actualizar la clase:', error);
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
    <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
      EDITAR CLASE
    </h1>   
     <form onSubmit={handleSubmit}>
     <div className="mb-4">
     <label htmlFor="nombre" className="block text-sm font-medium">
     Nombre de la clase</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"

        />
      </div>
      <div className="mb-4">
      <label htmlFor="descripcion" className="block text-sm font-medium">
      Descripción</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"

        />
      </div>
      <div className="mb-4">
      <label htmlFor="fecha" className="block text-sm font-medium">
      Fecha y Hora</label>
        <input
          type="datetime-local"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
        />
      </div>
      <div className="mb-4">
      <label htmlFor="disponibilidad" className="block text-sm font-medium">
            Cupos disponibles: </label>
        <input
          type="number"
          id="disponibilidad"
          name="disponibilidad"
          value={formData.disponibilidad}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"

        />
      </div>
      <div className="mb-4">
      <label htmlFor="imagen" className="block text-sm font-medium">
      Imagen URL:</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"

        />
      </div>
      <div className="mb-4">
          <label htmlFor="categoriaID" className="block text-sm font-medium">
          Categoría ID</label>
        <input
          type="text"
          id="categoriaId"
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"

        />
      </div>
      <div className="flex justify-center">
      <button type="submit" disabled={loading}
          className="px-6 py-2 text-white rounded-md hover:text-accent border border-white">
        Guardar cambios
      </button>
      </div>
    </form>
    </div>
  );
};

export default EditClassForm;
