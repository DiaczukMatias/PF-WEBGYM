import AllUsuarios from "@/components/Usuarios/AllUsers";

export default function UsuariosPage() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">Gestión de  todos los Usuarios</h1>
        <AllUsuarios/>
         </div>
    );
  }
  