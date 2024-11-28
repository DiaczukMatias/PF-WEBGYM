import SuspendedClasesView from "@/views/Clases/ClasesSuspendidas";

export default function ClasesSuspendidad() {
    return (
        <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">Clases suspendidas</h1>
        <SuspendedClasesView/>
      </div>
    );
  }