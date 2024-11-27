import CategoriasSuspendidasView from "@/views/CategoriasAdmin/CategoriasSuspendidas";

export default function CategoriasSuspendidas() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de Categorias suspendidas</h1>
       <CategoriasSuspendidasView/>
      </div>
    );
  }
  