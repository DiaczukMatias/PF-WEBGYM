/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categorias.length) % categorias.length);
    }, [categorias.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className="relative w-full max-w-screen-lg mx-auto">
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative h-[80vh] w-full">
                    <Link href={`/clases/${categorias[currentIndex].nombre}`}>
                        <img 
                             src={categorias[currentIndex].imagen} 
                             alt={`Slide ${categorias[currentIndex].nombre}`}
                            className="w-full h-full object-contain" 
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

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {categorias.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'} transition`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carrusel;
