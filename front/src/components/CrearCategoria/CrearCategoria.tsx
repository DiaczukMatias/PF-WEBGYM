"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createCategoria } from "@/helpers/Fetch/FetchCategorias";
import { validateNombre } from "@/helpers/validate/validateCrearCategoria";
import Swal from "sweetalert2";
import { FetchError } from "@/interfaces/IErrors";

const CrearCategoria = () => {
 // const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  //const token = session?.user?.accessToken

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateNombre(nombre);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    try {
     await createCategoria(nombre);
      Swal.fire("Éxito", "Categoría creada correctamente");
      setNombre("");
    } catch (err) {
      const error = err as FetchError;
      Swal.fire("Error", error.message, "error");
      console.log("error al crear categoria:", error);
    }
  };

  return (
    <div className="flex justify-center min-w-80 flex-col items-center m-4 p-6 rounded-lg border border-accent shadow-md">
    <h1 className="text-2xl font-bold mb-6 text-center text-accent font-OswaldSans-serif">
      CREAR CATEGORIA:
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto space-y-4">
      <div className="flex flex-col gap-6 mb-4">
      <label htmlFor="nombre" className="block text-sm font-medium">
        Nombre de la Categoría:
      </label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-transparent"
        placeholder="Nombre de la categoría"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        type="submit"
        className="bg-accent text-black py-2 px-4 rounded hover:bg-accent2 disabled:bg-gray-400"
        disabled={!nombre.trim()}
      >
        Crear Categoría
      </button>
      </div>
    </form>
    </div>
  );
};

export default CrearCategoria;
