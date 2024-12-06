import AllClasesView from "@/views/Clases/AllCLases";

export default function ClasesPage() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-2xl font-bold">Gestión de todas las Clases</h1>
        <AllClasesView />
      </div>
    );
  }
  