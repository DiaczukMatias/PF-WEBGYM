"use client";
import { fetchUserById } from '@/helpers/Fetch/FetchUsers';
import React, { useEffect, useState } from 'react';
import { isFetchError } from '@/helpers/Fetch/FetchClases';
import { crearPerfilProfesor } from '@/helpers/Fetch/FetchProfesores';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const CrearProfeForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter(); // Hook para redirección
  
  
  const [formData, setFormData] = useState<{
    usuariID: string;
    nombre: string;
    certificacion: string;
    descripcion: string;
    imagen: File | null; // Imagen será un File o null
  }>({
    usuariID: '',
    nombre: nombreUsuario,
    certificacion: '',
    descripcion: '',
    imagen: null,  // Inicialmente null
  });
  

  // Obtén el ID de la URL en el cliente
  useEffect(() => {
    const pathname = window?.location?.pathname;
    const extractedId = pathname.split('/').pop() || '';
    setUsuarioId(extractedId);
    
    const fetchUsuarioData = async () => {
        try {
          const usuario = await fetchUserById(extractedId);
          setNombreUsuario(usuario.nombre); // Asegúrate de que el backend devuelve un campo 'nombre'
          setFormData((prevData) => ({
            ...prevData,
            nombre: usuario.nombre,
            usuariID: extractedId,
          }));
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
          setErrorMessage('No se pudo cargar el usuario.');
        } finally {
          setLoading(false);
        }
      };   if (extractedId) {
        fetchUsuarioData();
      }
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    form.append('certificacion', formData.certificacion);
    
    if (formData.imagen) {
      form.append('imagen', formData.imagen); // Solo se envía si el usuario seleccionó una nueva imagen
    }
    
    try {           
      if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        setErrorMessage('No estás autenticado. Por favor, inicia sesión.');
        setLoading(false);
        return; // Detener la ejecución
      }
      await crearPerfilProfesor(usuarioId!, form, session?.user.accessToken); 
      // Alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Profesor creado!',
        text: 'El perfil del profesor se creo correctamente',
        confirmButtonText: 'OK',
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
        router.push('/admin/usuarios/activos/profesor'); // Redirige a /clases
      });
      
    } catch (error: unknown) {
      setLoading(false); // Detener el indicador de carga
      if (isFetchError(error)) {
        console.error('Error al crear al profesor:', error.message);
        setErrorMessage(error.message); // Mostrar el mensaje del error
      }else {
        console.error('Error desconocido:', error);
        setErrorMessage('Ha ocurrido un error desconocido'); // Mensaje genérico
      }
    } finally {
        setLoading(false); // Asegúrate de detener el indicador de carga
      }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
       CREAR PROFESOR
      </h1>   
      {/* Mostrar el mensaje de error */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} 

      <form onSubmit={handleSubmit}>
      
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
             readOnly 
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium">Descripción:</label>
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
          <label htmlFor="fecha" className="block text-sm font-medium">Certificacion:</label>
          <input
            type="text"
            id="certificacion"
            name="certificacion"
            value={formData.certificacion}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
        </div>

        {/* Imagen */}
        <div className="mb-4">
          <label htmlFor="imagen" className="block text-sm font-medium">Seleccionar imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
          />
        </div>


        {/* Botón de guardar cambios */}
        <div className="flex justify-center">
          <button type="submit" disabled={loading || !formData.certificacion || !formData.descripcion || !formData.nombre} className="px-6 py-2 text-white rounded-md hover:text-accent border border-white">
             Crear Profesor
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearProfeForm;
