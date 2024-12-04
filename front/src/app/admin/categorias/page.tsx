import AllCategorias from "@/views/CategoriasAdmin/AllCategorias";

export default function CategoriasPage() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Gestión de  todas las Categorías</h1>
        <AllCategorias />
      </div>
    );
  }
  

  