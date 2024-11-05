
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ICategoria } from '../../interfaces/ICategory';

interface CategoryProps {
  categories: ICategoria[];  // Recibe las categorías como prop
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, categories.length - itemsPerPage));
  };

  return (
    <div className="relative">
      <h2 className="flex justify-center font-medium m-6">Categorias:</h2>
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 border border-secondary2  hover:bg-secondary2 rounded-full"
          aria-label="Scroll left"
        >
          <div className="border-l-4 border-t-4  border-t-transparent w-0 h-0 transform rotate-135" />
        </button>
        <div className="overflow-hidden w-full">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {categories.map((categoria) => (
              <div key={categoria.id} className="flex-none w-1/8 mx-1 flex flex-col items-center">
                <a href={`/clases/${categoria.nombre}`} className="text-center">
                  <Image
                    src={`/images/categories/${categoria.nombre.toLowerCase()}.jpg`}  // Imagen en `public/images/categories/`
                    alt={categoria.nombre}
                    width={150}  
                    height={150}
                    className="h-24 w-auto max-w-full rounded-lg object-cover lg:h-48"
                  />
                  <h5 className="flex justify-center mt-1 text-sm">{categoria.nombre}</h5>
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-12 h-12 border border-secondary2  hover:bg-secondary2 rounded-full"
          aria-label="Scroll right"
        >
          <div className="border-r-4 border-b-4  border-b-transparent w-0 h-0 transform rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default Category;
