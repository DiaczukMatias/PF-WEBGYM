import AllCategorias from "@/views/CategoriasAdmin/AllCategorias";

export default function CategoriasPage() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de Categorías</h1>
        <p className="mt-4 text-lg">Todas las categorías...</p>
        <AllCategorias />
      </div>
    );
  }
  

  