//import { clasesData } from "@/helpers/datatemporalClases";
import ClassCard from "@/components/Card/Card";
import { fetchClaseById } from "@/helpers/Fetch/FetchClases";
import { FetchError } from "@/interfaces/IErrors";



const DetailsClass = async ({ params }: { params: Promise<{ id: string }> })  => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Opción 1: Datos temporales
  //const clase = clasesData.find((clase) => clase.id === id);
  
  // Opción 2: Fetch desde el backend
   // Inicializar la variable para almacenar los datos de la clase
   let clase;

   try {
    // Fetch de datos desde la API
    clase = await fetchClaseById(id);
  } catch (error : unknown) {
    const fetchError = error as FetchError;
    // Renderizar mensaje de error si el fetch falla
    return <p>Error al obtener la clase: {fetchError.message}</p>;
  }
  

  if (!clase) {
    return <p>Clase no encontrada</p>;
  }

  // Eliminar circularidad si existe
  const claseSinCircularidad = {
    ...clase,
    perfilProfesor: clase.perfilProfesor && typeof clase.perfilProfesor === 'object' && !Array.isArray(clase.perfilProfesor)
      ? { ...clase.perfilProfesor, clases: undefined }
      : undefined,
      estado: clase.estado ?? true, // Si 'activo' no existe, lo inicializa como 'true'.
    //  estado: true,
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <ClassCard clase={claseSinCircularidad} />
    </div>
  );
};

export default DetailsClass;
