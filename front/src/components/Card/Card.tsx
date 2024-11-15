import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { IClase } from '../../interfaces/IClase';
import { useRouter } from 'next/router'; // Importamos useRouter para redirigir después de eliminar la clase
import { deleteClase } from '../../helpers/Fetch/FetchClases';

interface ClassCardProps {
  clase: IClase;
}

const ClassCard: React.FC<ClassCardProps> = ({ clase }) => {
  const { nombre, descripcion, fecha, imagen, categoria, perfilProfesor, disponibilidad, id } = clase;

  // Obtener datos de la sesión
  const { data: session } = useSession();

  // Extraer `rolUsuario` y `profesorId` de la sesión
  const rolUsuario = session?.user?.rol || 'cliente'; // si el usuario es undefined o null automáticamente le asigna cliente
  const profesorId = session?.user?.id || '';

  // Formato de fecha
  const formattedHorario = new Date(fecha).toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Lógica para mostrar botones según el rol
  const isClaseDelProfesor = perfilProfesor?.id === profesorId;
  const mostrarBotonInscribirse = rolUsuario === 'cliente' || (rolUsuario === 'profesor' && !isClaseDelProfesor);
  const mostrarBotonEditarClase = rolUsuario === 'admin' || (rolUsuario === 'profesor' && isClaseDelProfesor);

  // Estado para manejar la visualización de la confirmación de eliminación
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para manejar el proceso de eliminación

  const router = useRouter(); // Para redirigir después de la eliminación

  // Función para eliminar la clase usando la función fetch
  const handleDeleteClass = async () => {
    setLoading(true);
    try {
      const response = await deleteClase(id);

      if (response.ok) {
        // Redirigir a la página de clases después de eliminar
        router.push('/clases');
      } else {
        throw new Error('Error al eliminar la clase');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error al eliminar la clase:', error);
    }
  };

  // Función para mostrar la confirmación de eliminación
  const showDeleteConfirmation = () => {
    setIsDeleteConfirmVisible(true);
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setIsDeleteConfirmVisible(false);
  };

  return (
    <div className="flex max-w-full min-h-80 rounded-lg overflow-hidden shadow-lg border border-accent">
      <div className='w-1/2'>
        {imagen && (
          <Image 
            src={imagen} 
            alt={nombre} 
            width={350} 
            height={200} 
            className="w-full object-cover"
          />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-center text-2xl font-semibold text-accent .fontOswaldSans-serif">{nombre.toUpperCase()}</h3>
        <p className="text-sm text-secondary2 mt-1">{categoria?.nombre}</p>
        <p className="text-sm text-secondary mt-2">Profesor: {perfilProfesor?.nombre}</p>
        <p className="text-sm text-secondary2 mt-2">{descripcion}</p>
        <p className="text-sm text-secondary2 mt-2">Fecha: {formattedHorario}</p>
        <p className="text-sm text-secondary2 mt-2">Cupos disponibles: {disponibilidad}</p>

        {/* Renderizar el botón correspondiente según el rol */}
        <div className="mt-4">
          {mostrarBotonInscribirse && (
            <button className=".submitButton .submitButton:hover">Inscribirse</button>
          )}
          {mostrarBotonEditarClase && (
            <button 
              className=".submitButton .submitButton:hover" 
              onClick={() => router.push(`/editar-clase/${id}`)} // Redirige al formulario de edición
            >
              Editar Clase
            </button>
          )}
        </div>

        {/* Mostrar botones de eliminación solo cuando el rol es correcto */}
        {mostrarBotonEditarClase && (
          <div className="mt-4">
            <button 
              className="m-2 p-2 border rounded-lg border-white text-white" 
              onClick={showDeleteConfirmation}
            >
              Eliminar Clase
            </button>
          </div>
        )}

        {/* Confirmación de eliminación */}
        {isDeleteConfirmVisible && (
          <div className="confirmation-modal">
            <p>¿Estás seguro de que quieres eliminar la clase: {nombre}?</p>
            <div className="flex gap-2">
              <button 
                className="m-2 p-2 border rounded-lg border-white text-white" 
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button 
                className="m-2 p-2 border rounded-lg border-red-700 text-red-700" 
                onClick={handleDeleteClass}
                disabled={loading}
              >
                {loading ? 'Eliminando...' : 'Eliminar Clase'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
