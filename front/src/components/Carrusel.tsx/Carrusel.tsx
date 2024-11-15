/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Categoria {
  nombre: string;
  imagen: string;
}

interface CarouselProps {
  categorias: Categoria[];
}

const Carrusel: React.FC<CarouselProps> = ({ categorias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categorias.length);
  }, [categorias.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + categorias.length) % categorias.length
    );
  }, [categorias.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-[90%] max-w-screen-lg mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative h-[50vh]">
          {" "}
          {/* Reducimos la altura del carrusel */}
          <Link href={`/clases/${categorias[currentIndex].nombre}`}>
            <img
              src={categorias[currentIndex].imagen}
              alt={`Slide ${categorias[currentIndex].nombre}`}
              className="w-full h-full object-contain rounded-2xl border-4 border-[#b6ff04]"
            />
          </Link>
        </div>
      </div>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-accent2 transition"
      >
        <FaChevronRight size={20} color="white" />
      </button>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-accent2 transition"
      >
        <FaChevronLeft size={20} color="white" />
      </button>
    </div>
  );
};

export default Carrusel;
