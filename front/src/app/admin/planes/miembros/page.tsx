import UsuariosConMembresia from "@/views/UsuariosConMembresia/UserConMembresia";

export default function MiembrosPlanes() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de los usuarios con planes</h1>
        <UsuariosConMembresia/>

      </div>
    );
  }
  