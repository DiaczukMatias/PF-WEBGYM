"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ICategoria } from "../../interfaces/ICategory";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CategoryProps {
  categories: ICategoria[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleScrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, categories.length - itemsPerPage)
    );
  };

  return (
    <div className="relative m-4">
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll left"
        >
          <div className="flex items-center">
            <FaChevronLeft size={20} color="white" />
          </div>
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            }}
          >
            {categories.map((categoria) => (
              <div
                key={categoria.id}
                className="flex-none w-1/3 mx-2 flex flex-col items-center"
              >
                <a href={`/clases/${categoria.nombre}`} className="text-center">
                  <Image
                    src={`/images/categories/${categoria.nombre.toLowerCase()}.png`} // Imagen en `public/images/categories/`
                    alt={categoria.nombre}
                    width={150}
                    height={150}
                    className="h-24 w-auto max-w-48 rounded-lg object-contain lg:h-48 lg:max-w-96 border border-accent"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:bg-accent2"
          aria-label="Scroll right"
        >
          <div className="flex items-center">
            <FaChevronRight size={20} color="white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Category;
