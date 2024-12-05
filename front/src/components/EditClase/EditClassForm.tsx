"use client";

import React, { useEffect, useState } from 'react';
import { fetchClaseById, isFetchError, updateClase } from '../../helpers/Fetch/FetchClases';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter, useParams } from 'next/navigation';

const EditClassForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter(); // Hook para redirección
  
  console.log('user session en edit class ',session?.user.accessToken);
  
  const [formData, setFormData] = useState<{
    id: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    disponibilidad: number;
    imagen: File | null; // Imagen será un File o null
    categoriaId: string;
    perfilProfesorId: string;
    categoriaNombre: string;
    profesorNombre: string;
    dia: string;
    hora: string;
  }>({
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    disponibilidad: 0,
    imagen: null,  // Inicialmente null
    categoriaId: '',
    perfilProfesorId: '',
    categoriaNombre: '',
    profesorNombre: '',
    dia : '',
    hora: ''  
  });
  

  // Obtén el ID de la URL en el cliente
  

  // Carga los datos de la clase cuando se obtenga el ID
  useEffect(() => {
    
    if (id  && !Array.isArray(id)) {
      fetchClaseById(id)
        .then((claseData) => {
          const [dia, hora] = claseData.fecha ? claseData.fecha.split(" ") : ["", ""]
          // Asignar los valores de la API, pero no sobrescribir la imagen
          const updatedClaseData = {
            ...claseData,
            perfilProfesorId: claseData.perfilProfesor?.id || '',
            dia: dia || "",
            hora: hora || "",
            disponibilidad: claseData.disponibilidad ?? 0,
            categoriaId: claseData.categoria ? claseData.categoria.id : '',
            categoriaNombre: claseData.categoria ? claseData.categoria.nombre : '',
            profesorNombre: claseData.perfilProfesor?.nombre || '', // Guardamos el nombre del profesor
            imagen: null // No asignamos la imagen de la base de datos, solo la nueva si el usuario la selecciona
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      imagen: file, // Al seleccionar una nueva imagen, la asignamos aquí
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); //
    setLoading(true);

    const form = new FormData();
    form.append('nombre', formData.nombre);
    form.append('descripcion', formData.descripcion);
    form.append("fecha", `${formData.dia} ${formData.hora}`);
    form.append('disponibilidad', formData.disponibilidad.toString());
    form.append('categoriaId', formData.categoriaId);
    form.append('perfilProfesorId', formData.perfilProfesorId);
    
    if (formData.imagen) {
      form.append('imagen', formData.imagen); // Solo se envía si el usuario seleccionó una nueva imagen
    }
    
    console.log('disponibilidad tipo:', typeof formData.disponibilidad);


    try {     
      if (!id || Array.isArray(id)) {
        throw new Error('El ID no es válido.'); // O manejarlo de forma más específica
    }
      if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
        setLoading(false);
        return; // Detener la ejecución
      }
      await updateClase(id!, form, session?.user.accessToken); 
      // Alerta de éxito
      Swal.fire({
        position: "top",
        icon: "success",
        title:  "Clase actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'bg-accent text-white',
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white');
            popup.style.backgroundColor = '#333'; // Fondo oscuro
            popup.style.color = 'white'; // Texto blanco
          }
        },
      }).then(() => {
        router.push('/clases'); // Redirige a /clases
      });
      
    } catch (error: unknown) {
      setLoading(false); // Detener el indicador de carga
      if (isFetchError(error)) {
        console.error('Error al actualizar la clase:', error.message);
        setErrorMessage(error.message); // Mostrar el mensaje del error
      }else {
        console.error('Error desconocido:', error);
        setErrorMessage('Ha ocurrido un error desconocido'); // Mensaje genérico
      }
      
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
        EDITAR CLASE
      </h1>   
      {/* Mostrar el mensaje de error */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} 
      <form onSubmit={handleSubmit}>
        {/* Nombre de la clase */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium">Nombre de la clase</label>
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

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium">Descripción</label>
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

        {/* Fecha y Hora */}
        {/* Día y hora */}
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-sm font-medium">
            Día y Hora:
          </label>
          <div className="flex gap-2">
            <select
              id="dia"
              name="dia"
              value={formData.dia}
              onChange={handleChange}
              className="p-2 w-1/2 border border-gray-300 rounded-md bg-transparent"
            >
              <option value="">Selecciona un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
            </select>
            <select
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="p-2 w-1/2 border border-gray-300 rounded-md bg-transparent"
            >
              <option value="">Selecciona una hora</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = 9 + i;
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Cupos disponibles */}
        <div className="mb-4">
          <label htmlFor="disponibilidad" className="block text-sm font-medium">Cupos disponibles:</label>
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

        {/* Imagen */}
        <div className="mb-4">
          <label htmlFor="imagen" className="block text-sm font-medium">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label htmlFor="categoriaId" className="block text-sm font-medium">Categoría</label>
          <input
            type="text"
            id="categoriaId"
            name="categoriaId"
            value={formData.categoriaNombre}
            onChange={handleChange}
            disabled
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
        </div>

        {/* Profesor */}
        <div className="mb-4">
          <label htmlFor="perfilProfesorId" className="block text-sm font-medium">Profesor</label>
          <input
            type="text"
            id="perfilProfesorId"
            name="perfilProfesorId"
            value={formData.profesorNombre}
            onChange={handleChange}
            disabled
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
        </div>

        {/* Botón de guardar cambios */}
        <div className="flex justify-center">
          <button type="submit" disabled={loading} className="px-6 py-2 text-white rounded-md hover:text-accent border border-white">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClassForm;
