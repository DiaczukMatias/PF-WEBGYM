"use client";
import React from "react";
import { useParams } from "next/navigation";
import styles from "./checkout.module.css";

const planes = [
  {
    id: "1",
    name: "PRO PLAN",
    description:
      "Nuestro Plan Pro ofrece entrenamientos avanzados y asesoramiento personalizado en nutrición para ayudarte a alcanzar tus objetivos más rápido. ¡Regístrate ahora!",
    features: [
      "Acceso a todos nuestros videos de ejercicios",
      "Seguimiento de progreso",
      "Comunidad en línea de apoyo",
      "Planes de entrenamiento avanzados y personalizados",
      "Asesoramiento completo en nutrición",
      "Acceso a programas de entrenamiento avanzados",
      "Análisis de composición corporal",
    ],
    price: 99,
    buttonText: "ELEGIR PLAN",
  },
  {
    id: "2",
    name: "PLAN BÁSICO",
    description:
      "Nuestro Plan Básico es perfecto para aquellos que desean comenzar con el fitness, ofreciendo una forma simple y asequible de entrenar regularmente.",
    features: [
      "Acceso a videos de ejercicios básicos",
      "Seguimiento de progreso",
      "Soporte de la comunidad",
      "Consejos básicos de nutrición",
      "Actualizaciones por correo electrónico semanales",
      "Acceso a desafíos grupales",
      "Revisiones mensuales de estado físico",
    ],
    price: 19,
    buttonText: "ELEGIR PLAN",
  },
  {
    id: "3",
    name: "PLAN CUSTOMIZADO",
    description:
      "Crea tu propio plan personalizado según tus necesidades específicas. Perfecto para quienes desean un enfoque más personalizado en el fitness y la nutrición.",
    features: [
      "Videos de entrenamiento personalizados",
      "Asesoramiento nutricional personalizado",
      "Seguimiento de progreso personalizado",
      "Sesiones de coaching uno a uno",
      "Desafíos de fitness personalizados",
      "Acceso a recursos premium",
      "Técnicas avanzadas de recuperación",
    ],
    price: 59,
    buttonText: "ELEGIR PLAN",
  },
];

const Checkout: React.FC = () => {
  const { planId } = useParams();

  const selectedPlan = planes.find((plan) => plan.id === planId);

  // const handlePayment = async () => {
  //   try {
  //     const response = await fetch("pay/success/checkout/session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create checkout session");
  //     }

  //     const data = await response.json();
  //     if (data.url) {
  //       window.location.href = data.url;
  //     } else {
  //       throw new Error("No checkout URL returned");
  //     }
  //   } catch (error) {
  //     console.error("Error al redirigir a Stripe:", error);
  //   }
  // };

  if (!selectedPlan) {
    return <p>Plan no encontrado</p>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <div className={styles.formContainer}>
          <h2 className={styles.checkoutTitle}>CHECKOUT</h2>
          <p className={styles.checkoutSubtitle}>
            Por favor, ingresa los detalles de tu tarjeta de crédito para
            continuar con el pago
          </p>

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Numero de la tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 - 4548 - 5614 - 9745"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cardHolderName">Nombre del dueño</label>
              <input
                type="text"
                id="cardHolderName"
                placeholder="David Handsome"
              />
            </div>
            <div className={styles.formGroupInline}>
              <div className={styles.formGroup}>
                <label htmlFor="expirationDate">Vencimiento</label>
                <div className={styles.mini}>
                  <input
                    type="text"
                    id="expirationDate"
                    placeholder="05/2030"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="verificationCode">Codigo de seguridad</label>
                <div className={styles.mini}>
                  <input type="text" id="verificationCode" placeholder="546" />
                </div>
              </div>
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.price}>${selectedPlan.price}</span>
            </div>
            <button type="submit" className={styles.paymentButton}>
              ADQUIRIR AHORA
            </button>
          </form>
        </div>

        <div className={styles.planContainer}>
          <h2 className={styles.planTitle}>{selectedPlan.name}</h2>
          <h3>Descripcion</h3>
          <p>{selectedPlan.description}</p>
          <h3>Caracteristicas</h3>
          <ul>
            {selectedPlan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Checkout;
