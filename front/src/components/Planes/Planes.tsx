"use client"
import React, { useState, useEffect } from 'react';
import styles from "./Planes.module.css";
import { IMembresia } from "@/interfaces/IMembresia";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { loadStripe } from "@stripe/stripe-js";
import { desactivarMembresia } from '@/helpers/Fetch/FetchMembresias';
import { useSession } from 'next-auth/react';

interface PlanesProps {
    membresia: IMembresia[];
}

const PlanesCard: React.FC<PlanesProps> = ({membresia}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [localPlan, setLocalPlan] = useState(membresia);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const itemsPerPage = 3;
  const { data: session } = useSession();

  const handleSelectPlan = async (planId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3010/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al crear la sesión de Stripe");
      }
      const { sessionId, url } = await response.json();

      console.log("URL", url);
      console.log("Session ID", sessionId);

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      console.log("SDK STRIPE:", stripe);
      if (!stripe) {
        throw new Error("No se pudo cargar el SDK de Stripe");
      }
      window.open(url, "_blank");
      // const result = await stripe.redirectToCheckout({ sessionId });
      // if (result.error) {
      //   console.error("Error al redirigir al checkout:", result.error);
      // }
    } catch (error) {
      console.error("Error al redirigir a Stripe:", error);
    }
  };


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
      Math.min(prev + 1, membresia.length - itemsPerPage)
    );
  };
  
  const handleTogglePlan = async ( nombre: string) => {
    if (!session?.user.accessToken) {
      console.error('El token de acceso no está disponible.');
      return; // Detener la ejecución
    }
    try {
      const updatedMembresia = await  desactivarMembresia( nombre, session.user.accessToken);
      setLocalPlan((prev) =>
        prev.map((membresia) =>
          membresia.nombre === nombre
      ? { ...membresia, activo: updatedMembresia.activo }
            : membresia
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del plan', error);
    }
  };

  useEffect(() => {
    setLocalPlan(
      membresia.map((plan) => ({
        ...plan,
        activo: plan.activo ?? true, // Si 'activo' no existe, lo inicializa como 'true'.
      }))
    );
  }, [membresia]);

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>
      <span className={styles.whiteText}>NUESTROS</span>
      <span className={styles.greenText}>PLANES</span>
    </h2>
      <div className="relative m-4 py-4">
        <div className="flex items-center">
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
            {localPlan.map((membresia) => (
              <div
                key={membresia.id}
                className={styles.card}
                              >
                {isAdminRoute ? (
                    <div>
                    <div className={styles.titulo}>{membresia.nombre}</div>
                    <p className={styles.cardDescription}>{membresia.descripcion}</p>
                    <div className={styles.planContainer}>
                      <h3 className={styles.planTitle}>Características</h3>
                    </div>
                    <ul className={styles.cardFeatures}>
                      {membresia.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className={styles.price}>{membresia.precio}$</div>
                    <div className={styles.buttonsContainer}>
                      <button
                        className="submitButton submitButton:hover "
                        onClick={() => (window.location.href = `/editar-plan/${membresia.id}`)}
                      >
                        Editar Plan
                      </button>
                      <button
                      onClick={() => handleTogglePlan( membresia.nombre)}
                      className={`ml-4 ${
                        membresia.activo 
                          ? 'submitButtonSuspend'
                          : 'submitButton'
                      }`}
                    >
                      {membresia.activo  ? 'Suspender' : 'Activar'}
                    </button>
                    
                    </div>
                  </div>
                ) : (
                 <div> 
                   <div className={styles.titulo}>{membresia.nombre}</div>
                        <p className={styles.cardDescription}>{membresia.descripcion}</p>
                      <div className={styles.planContainer}>
                        <h3 className={styles.planTitle}>Características</h3>
                   </div>
                     <ul className={styles.cardFeatures}>
                         {membresia.features?.map((feature, index) => (
                             <li key={index}>{feature}</li>
                ))}
                     </ul>
                   <div className={styles.price}>{membresia.precio}$</div>
                      <button
                       className={styles.button}
                       onClick={() => handleSelectPlan(membresia.id)}
                      >
                      ELEGIR PLAN
                      </button>
                </div>  

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
    </div>
  );
};


export default PlanesCard
