import { clasesData } from "@/helpers/datatemporalClases";
import ClassCard from '@/components/Card/Card';

const DetailsClass = async ({ params }: { params: { nombre: string } }) => {
  const { nombre } = await params;

  // Buscar la clase por el nombre pasado en la URL
  const clase = clasesData.find((clase) => clase.nombre.toLowerCase() === nombre.toLowerCase());

  // Si no se encuentra la clase, mostrar mensaje de error
  if (!clase) {
    return <p>Clase no encontrada</p>;
  }

  // Eliminar la referencia circular en `perfilProfesor`
  const claseSinCircularidad = {
    ...clase,
    perfilProfesor: clase.perfilProfesor ? { ...clase.perfilProfesor, clases: undefined } : undefined,
  };

  return (
    <div className="container mx-auto p-4">
      <ClassCard clase={claseSinCircularidad} />
    </div>
  );
};

export default DetailsClass;
