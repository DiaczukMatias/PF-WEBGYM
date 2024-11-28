"use client";
import { useEffect, useState } from "react";
//import { fetchGetSuspendedClases } from "@/helpers/Fetch/FetchSuspend";
import { fetchClases } from "@/helpers/Fetch/FetchClases";
import ClassCardList from "@/components/CardList/CardList"; // Componente para mostrar las tarjetas
import { ISearchResult } from "@/interfaces/ISearch"; // Asegúrate de tener la interfaz para los resultados de búsqueda

const SuspendedClasesView = () => {
  const [suspendedClasses, setSuspendedClasses] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch clases suspendidas
  useEffect(() => {
    const getSuspendedClasses = async () => {
      try {
        setLoading(true);
        const data = await fetchClases()  //fetchGetSuspendedClases();   //cambiarle al fetch de suspendidas cuando funcionen
        setSuspendedClasses(data);
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
