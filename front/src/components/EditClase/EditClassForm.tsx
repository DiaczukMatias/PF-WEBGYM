"use client";

import React, { useEffect, useState } from 'react';
import { fetchClaseById, updateClase } from '../../helpers/Fetch/FetchClases';
import { useSession } from 'next-auth/react';

const EditClassForm: React.FC = () => {
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
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null); 
  const { data: session } = useSession();

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
          setFormData({
            ...claseData,
            fecha: claseData.fecha.slice(0, 16),
          });
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
    <form onSubmit={handleSubmit}>
      {/* Contenido del formulario */}
      <div>
        <label htmlFor="nombre">Nombre de la clase</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="fecha">Fecha y Hora</label>
        <input
          type="datetime-local"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="disponibilidad">Disponibilidad</label>
        <input
          type="number"
          id="disponibilidad"
          name="disponibilidad"
          value={formData.disponibilidad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="imagen">Imagen</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="categoriaId">Categoría ID</label>
        <input
          type="text"
          id="categoriaId"
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        Guardar cambios
      </button>
    </form>
  );
};

export default EditClassForm;
