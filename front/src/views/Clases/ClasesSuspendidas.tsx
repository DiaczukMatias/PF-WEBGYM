"use client";
import { useEffect, useState } from "react";
//import { fetchGetSuspendedClases } from "@/helpers/Fetch/FetchSuspend";/mport { fetchClases, fetchTodasClases } from "@/helpers/Fetch/FetchClases";
import { fetchTodasClases } from "@/helpers/Fetch/FetchClases";
import ClassCardList from "@/components/CardList/CardList"; // Componente para mostrar las tarjetas
import { IClase } from "@/interfaces/IClase";
import { useSession } from "next-auth/react";


const SuspendedClasesView = () => {
  const [suspendedClasses, setSuspendedClasses] = useState<IClase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const [page] = useState<number> (1);  // Estado para la página
  const [limit] = useState<number> (15);  // Estado para el límite de clases por página
  const { data: session } = useSession();


  // Fetch clases suspendidas
  useEffect(() => {
    const getSuspendedClasses = async () => {
      
      try {
        if (!session?.user.accessToken) {
          console.error('El token de acceso no está disponible.');
          setLoading(false);
          return; // Detener la ejecución
        }
        setLoading(true);
     //   const clasesSuspendidas = await fetchGetSuspendedClases(session?.user.accessToken );
    //    setSuspendedClasses(clasesSuspendidas);

        
        const todasClasesResponse: IClase[] = await fetchTodasClases(page, limit, session.user.accessToken);
        setSuspendedClasses(todasClasesResponse.filter((clases) => !clases.estado))

        /*  if (!todasClasesResponse.ok) {
           throw new Error(`Error al obtener todas las clases: ${todasClasesResponse.status}`); 
           }
          const todasClases: IClase[] = await todasClasesResponse.json();
          console.log('Todas las clases:', todasClases);

       const clasesActivasResponse = await fetchClases();
         if (!clasesActivasResponse.ok) {
           throw new Error('Error al obtener las clases activas');
         }
         const clasesActivas: IClase[] = await clasesActivasResponse.json();
         

        const clasesRestadas = todasClases.filter((clase: IClase) => 
          !clasesActivas.some((c: IClase) => c.id === clase.id)
      );
      
        setSuspendedClasses(clasesRestadas);*/

      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar las clases suspendidas.");
      } finally {
        setLoading(false);
      }
    };

    getSuspendedClasses();
  }, [session, page, limit]);

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
