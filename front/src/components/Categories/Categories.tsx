'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ICategoria } from '@/interfaces/ICategory';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { suspendCategoria } from '@/helpers/Fetch/FetchSuspend';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';


interface CategoryProps {
  categories: ICategoria[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localCategories, setLocalCategories] = useState(categories);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const itemsPerPage = 3;
  const { data: session } = useSession();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdminRoute(window.location.pathname.includes('/admin'));
    }
  }, []);

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, categories.length - itemsPerPage)
    );
  };

  const handleToggleCategory = async (categoria:ICategoria ) => {
    try {
      if (!session?.user.accessToken) {
        console.error('El token de acceso no está disponible.');
        return; // Detener la ejecución
      }

      // Confirmación con Swal
      const result = await Swal.fire({
        title: `¿Estás seguro de que quieres ${categoria.estado ? "suspender" : "activar"} esta categoria?`,
        text: categoria.nombre,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: categoria.estado ? "Suspender" : "Activar",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: categoria.estado ? "bg-red-600 text-white" : "bg-accent text-white",
          cancelButton: "bg-gray-300 text-black",
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add("bg-dark", "text-white");
            popup.style.backgroundColor = "#333";
            popup.style.color = "white";
          }
        },
      });

      if (result.isConfirmed) {

     await suspendCategoria( categoria.id, !categoria.estado, session?.user.accessToken);
       // Actualizar el estado local
       setLocalCategories((prevUsers) =>
        prevUsers.map((c) =>
          c.id === categoria.id ? { ...c, estado: !c.estado } : c
        )
      );
       // Notificación de éxito
       Swal.fire({
        title: "Éxito",
        text: `La categoria ${categoria.nombre} ha sido ${categoria.estado ? "suspendido" : "activado"} correctamente.`,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-accent text-white",
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add("bg-dark", "text-white");
            popup.style.backgroundColor = "#333";
            popup.style.color = "white";
          }
        },
      });
    }
  } catch (error) {
    console.error("Error al suspender/activar la categoria:", error);

    Swal.fire({
      title: "Error",
      text: "Hubo un problema al realizar la acción. Inténtalo nuevamente.",
      icon: "error",
      customClass: {
        confirmButton: "bg-gray-300 text-white",
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.classList.add("bg-dark", "text-white");
          popup.style.backgroundColor = "#333";
          popup.style.color = "white";
        }
      },
    });
  }
};

  useEffect(() => {
    setLocalCategories(
      categories.map((categories) => ({
        ...categories,
      }))
    );
  }, [categories]);


  return (
    <div className="relative m-4 py-4  ml-40 flex items-center justify-center">
      <div className="flex items-center w-4/5 m-4 ">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll left"
        >
          <FaChevronLeft size={20} color="white" />
        </button>
        <div className="overflow-hidden w-4/5">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            }}
          >
            {localCategories.map((categoria) => (
              <div
                key={categoria.id}
                className="flex-none w-1/3 flex flex-col items-center relative mr-1"
              >
                {isAdminRoute ? (
                  <div className="text-center">
                    <Image
                      src={categoria.imagen ||`/images/categories/${categoria.nombre.toLowerCase()}.png`}
                      alt={categoria.nombre}
                      width={150}
                      height={150}
                      className="w-auto rounded-lg object-contain sm:min-h-24 sm:max-h-48 md:min-h-28 md:max-h-64 lg:min-h-36 lg:max-h-72 border border-accent"
                      />
             <h1 className="text-center sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 mt-4 text-white text-shadow-lg fontOswaldSans-serif">
                    {categoria.nombre.toUpperCase()}
                    </h1>
                    <button
                      onClick={() => handleToggleCategory(categoria)}
                        className={`ml-4 ${
                          categoria.estado  ? 'submitButtonSuspend': 'submitButton'}`}
                    >
                      {categoria.estado ? 'Suspender' : 'Activar'}
                    </button>
                  </div>
                ) : (
                  <a href={`/clases`} className="text-center">
                    <Image
                      src={categoria.imagen ||`/images/categories/${categoria.nombre.toLowerCase()}.png`}
                      alt={categoria.nombre}
                      width={150}
                      height={150}
                      className="w-auto rounded-lg object-contain sm:min-h-24 sm:max-h-48 md:min-h-28 md:max-h-64 lg:min-h-36 lg:max-h-72 border border-accent"
                    />
                    <h1 className="absolute bottom-0 ml-4 text-center sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 flex flex-wrap text-white text-shadow-lg fontOswaldSans-serif">
                    {categoria.nombre.toUpperCase()}
                    </h1>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll right"
        >
          <FaChevronRight size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Category;
