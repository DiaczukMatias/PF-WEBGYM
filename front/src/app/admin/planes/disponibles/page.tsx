import PlanesAdminView from "@/views/Planes/PlanesAdmin";

export default function Planesdisponibles() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los planes</h1>
       <PlanesAdminView/>
      </div>
    );
  }
  