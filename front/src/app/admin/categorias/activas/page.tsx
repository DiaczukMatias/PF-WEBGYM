
import CategoriasActivasView from "@/views/CategoriasAdmin/CategoriasActivas";


export default function CategoriasActivas() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de Categorias</h1>
        <p className="mt-4 text-lg">Contenido relacionado con categorias...</p>
        <CategoriasActivasView/>
      </div>
    );
  }
  