"use client";
import { useEffect, useState } from "react";
//import { fetchGetSuspendedClases } from "@/helpers/Fetch/FetchSuspend";
import { fetchClases, fetchTodasClases } from "@/helpers/Fetch/FetchClases";
import ClassCardList from "@/components/CardList/CardList"; // Componente para mostrar las tarjetas
import { IClase } from "@/interfaces/IClase";

const SuspendedClasesView = () => {
  const [suspendedClasses, setSuspendedClasses] = useState<IClase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [page] = useState(1);  // Estado para la página
  const [limit] = useState(10);  // Estado para el límite de clases por página

  // Fetch clases suspendidas
  useEffect(() => {
    const getSuspendedClasses = async () => {
      try {
        setLoading(true);

        const todasClasesResponse = await fetchTodasClases(page, limit);
        const todasClases: IClase[] = await todasClasesResponse.json(); 

        const clasesActivasResponse = await fetchClases();
        const clasesActivas: IClase[] = await clasesActivasResponse.json();

        const clasesRestadas = todasClases.filter((clase: IClase )=> !clasesActivas.some((c: IClase) => c.id === clase.id) 
      );
        setSuspendedClasses(clasesRestadas);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar las clases suspendidas.");
      } finally {
        setLoading(false);
      }
    };

    getSuspendedClasses();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-white">Cargando clases suspendidas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : suspendedClasses.length === 0 ? (
        <p className="text-secondary2">No se encontraron clases suspendidas.</p>
      ) : (
        <ClassCardList classes={suspendedClasses} />
      )}
    </div>
  );
};

export default SuspendedClasesView;
