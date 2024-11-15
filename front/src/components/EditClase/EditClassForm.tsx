import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchClaseById, updateClase } from '../../helpers/Fetch/FetchClases';

const EditClassForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id:  '',
    nombre: '',
    descripcion: '',
    fecha: '',
    disponibilidad: 0,
    imagen: '',
    categoriaId: '',
    perfilProfesorId: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchClaseById(id as string).then((claseData) => {
        setFormData({
          ...claseData,
          fecha: claseData.fecha.slice(0, 16), // Formateamos la fecha
        });
        setLoading(false);
      }).catch((error) => {
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
      await updateClase(id as string, formData);
      router.push('/clases'); // Redirigir a la lista de clases
    } catch (error) {
      console.error('Error al actualizar la clase:', error);
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
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

      {/* Profesor ya no editable */}
      {/* <div>
        <label htmlFor="perfilProfesorId">Profesor ID</label>
        <input
          type="text"
          id="perfilProfesorId"
          name="perfilProfesorId"
          value={formData.perfilProfesorId}
          onChange={handleChange}
          required
        />
      </div> */}

      <button type="submit" disabled={loading}>Guardar cambios</button>
    </form>
  );
};

export default EditClassForm;
