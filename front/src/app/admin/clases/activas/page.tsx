import ClasesView from "@/views/Clases/Clases";

export default function ClasesActivas() {
    return (
        <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">CLASES ACTIVAS</h1>
        <p className="mt-4">Contenido relacionado con clases activas...</p>
        <ClasesView />
      </div>
    );
  }