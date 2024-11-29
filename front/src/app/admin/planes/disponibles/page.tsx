import PlanesView from "@/views/Planes/PlanesView";
// importar fet planes disponibles 


export default function Planesdisponibles() {

  //const fetchFunction= pasarle el fetch planes disponibles;
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes</h1>
       <PlanesView /*fetchPlanes={fetchFunction}*//>
      </div>
    );
  }
  