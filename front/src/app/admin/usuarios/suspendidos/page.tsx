import UsersSuspend from "@/components/Usuarios/UsersSuspendidos";


export default function Usuarios() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de Usuarios suspendidos</h1>
        <UsersSuspend/>
      </div>
    );
  }

  