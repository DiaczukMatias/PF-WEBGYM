"use client"
import React, { useState, useEffect } from 'react';
import styles from "@/components/Planes/Planes.module.css";
import { IMembresia } from "@/interfaces/IMembresia";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { loadStripe } from "@stripe/stripe-js";
//import { desactivarMembresia } from '@/helpers/Fetch/FetchMembresias';
import { suspendPlan } from '@/helpers/Fetch/FetchSuspend';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";


interface PlanesProps {
    membresia: IMembresia[];
}

const PlanesCard: React.FC<PlanesProps> = ({membresia}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [localPlan, setLocalPlan] = useState(membresia);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const itemsPerPage = 3;
  const { data: session } = useSession();

  const router = useRouter();


  const handleSelectPlan = async (membresia: IMembresia) => {
    try {
          const response = await fetch(
        `https://proyecto21a.onrender.com/membresias/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ membresiaId: membresia.id,
            precio: membresia.precio,
            email: session?.user.email, }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al crear la sesión de Stripe");
      }
      const { sessionId, url } = await response.json();
      localStorage.setItem("membresia elegida:", JSON.stringify(membresia));
      router.push(url);

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
  
  const handleTogglePlan = async ( membresia: IMembresia) => {
    try {
    if (!session?.user.accessToken) {
      Swal.fire({
        title: "Error",
        text: "No estás autorizado para realizar esta acción",
        icon: "error",
        customClass: {
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
      return;
    }

  // Confirmación con Swal
  const result = await Swal.fire({
    title: `¿Estás seguro de que quieres ${membresia.activa ? "suspender" : "activar"} este plan?`,
    text: membresia.nombre,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: membresia.activa ? "Suspender" : "Activar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: membresia.activa ? "bg-red-600 text-white" : "bg-accent text-white",
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

  if (result.isConfirmed){
    if (!membresia.id)
       return;

       await  suspendPlan(membresia.id, !membresia.activa, session.user.accessToken);

      setLocalPlan((prev) =>
        prev.map((m) =>
          m.nombre === membresia.nombre? { ...m, activa: !m.activa } : m
        )
      );

      
        // Notificación de éxito
        Swal.fire({
          title: "Éxito",
          text: `El plan ha sido ${membresia.activa ? "suspendido" : "activado"} correctamente.`,
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
      console.error('Error al cambiar el estado del plan', error);

      Swal.fire({
        title: "Error",
        text: `Hubo un problema al realizar la acción. Inténtalo nuevamente.  `,
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
  }
  

  useEffect(() => {
    setLocalPlan(
      membresia.map((membresia) => ({
        ...membresia,
       // activa: membresia.activa ?? true, // Si 'activo' no existe, lo inicializa como 'true'.
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
                      onClick={() => handleTogglePlan(membresia)}
                      className={`ml-4 ${
                        membresia.activa  
                          ? 'submitButtonSuspend'
                          : 'submitButton'
                      }`}
                    >
                      {membresia.activa ? 'Suspender' : 'Activar'}
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
                       onClick={() => {
                        if (membresia.id) {
                          handleSelectPlan(membresia);
                        }
                      }}
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
