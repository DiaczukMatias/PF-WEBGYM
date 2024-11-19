// pages/clase/[id].tsx
import { clasesData } from "@/helpers/datatemporalClases";
import ClassCard from "@/components/Card/Card";
//import { fetchClaseById } from "@/helpers/Fetch/FetchClases";

const DetailsClass = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  // Opción 1: Datos temporales
  const clase = clasesData.find((clase) => clase.id === id);
  /*
  // Opción 2: Fetch desde el backend
  try {
    const clase = await fetchClaseById(id);
  } catch (error) {
    return <p>Error al obtener la clase: {error.message}</p>;
  }
  */

  if (!clase) {
    return <p>Clase no encontrada</p>;
  }

  // Eliminar circularidad si existe
  const claseSinCircularidad = {
    ...clase,
    perfilProfesor: clase.perfilProfesor
      ? { ...clase.perfilProfesor, clases: undefined }
      : undefined,
  };

  return (
    <div className="container mx-auto p-4">
      <ClassCard clase={claseSinCircularidad} />
    </div>
  );
};

export default DetailsClass;
