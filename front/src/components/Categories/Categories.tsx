'use client';
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ICategoria } from '@/interfaces/ICategory';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { suspendCategoria } from '@/helpers/Fetch/FetchSuspend';

interface CategoryProps {
  categories: ICategoria[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localCategories, setLocalCategories] = useState(categories);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const itemsPerPage = 3;
  const { data: session } = useSession();
  const token = session?.user?.accessToken ?? "";

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

  const handleToggleCategory = async (id: string) => {
    try {
      const updatedCategory = await suspendCategoria(token, id);
      setLocalCategories((prev) =>
        prev.map((categories) =>
          categories.id === id
            ? { ...categories, estado: updatedCategory.activo }
            : categories
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado de la categoría:', error);
    }
  };

  useEffect(() => {
    setLocalCategories(
      categories.map((categories) => ({
        ...categories,
        activo: categories.activo ?? true, // Si 'activo' no existe, lo inicializa como 'true'.
      }))
    );
  }, [categories]);


  return (
    <div className="relative m-4 py-4">
      <div className="flex items-center lg:mx-16">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll left"
        >
          <FaChevronLeft size={20} color="white" />
        </button>
        <div className="overflow-hidden w-full">
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
                      src={`/images/categories/${categoria.nombre.toLowerCase()}.png`}
                      alt={categoria.nombre}
                      width={150}
                      height={150}
                      className="w-auto rounded-lg object-contain sm:min-h-24 sm:max-h-48 md:min-h-28 md:max-h-64 lg:min-h-36 lg:max-h-72 border border-accent"
                      />
    <h1 className="text-center sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 mt-4 text-white text-shadow-lg fontOswaldSans-serif">
         {categoria.nombre.toUpperCase()}
                    </h1>
                    <button
                      onClick={() => handleToggleCategory(categoria.id)}
                        className={`ml-4 ${
                          categoria.activo 
                            ? 'submitButtonSuspend'
                            : 'submitButton'
                        }`}
                    >
                      {categoria.activo ? 'Suspender' : 'Activar'}
                    </button>
                  </div>
                ) : (
                  <a href={`/clases`} className="text-center">
                    <Image
                      src={`/images/categories/${categoria.nombre.toLowerCase()}.png`}
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
