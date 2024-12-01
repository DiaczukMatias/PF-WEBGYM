import AllClasesView from "@/views/Clases/AllCLases";

export default function ClasesPage() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">Gestión de Clases</h1>
        <p className="mt-4">Contenido relacionado con clases...</p>
        <AllClasesView />
      </div>
    );
  }
  