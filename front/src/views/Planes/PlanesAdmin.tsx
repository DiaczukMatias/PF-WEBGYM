"use client"
import React from "react";
import styles from "./PlanesView.module.css";

export const planes = [
  {
    id: "1",
    name: "PRO PLAN",
    description:
      "Nuestro Plan Pro ofrece entrenamientos avanzados y asesoramiento personalizado en nutrición para ayudarte a alcanzar tus objetivos más rápido. ¡Regístrate ahora!",
    features: [
      "Seguimiento de progreso",
      "Comunidad en línea de apoyo",
      "Planes de entrenamiento avanzados y personalizados",
      "Asesoramiento completo en nutrición",
      "Acceso a programas de entrenamiento avanzados",
      "Análisis de composición corporal",
    ],
    price: 99,
  },
  {
    id: "2",
    name: "PLAN BÁSICO",
    description:
      "Nuestro Plan Básico es perfecto para aquellos que desean comenzar con el fitness, ofreciendo una forma simple y asequible de entrenar regularmente.",
    features: [
      "Seguimiento de progreso",
      "Soporte de la comunidad",
      "Consejos básicos de nutrición",
      "Actualizaciones por correo electrónico semanales",
      "Acceso a desafíos grupales",
      "Revisiones mensuales de estado físico",
    ],
    price: 19,
  },
  {
    id: "3",
    name: "PLAN CUSTOMIZADO",
    description:
      "Crea tu propio plan personalizado según tus necesidades específicas. Perfecto para quienes desean un enfoque más personalizado en el fitness y la nutrición.",
    features: [
      "Asesoramiento nutricional personalizado",
      "Seguimiento de progreso personalizado",
      "Sesiones de coaching uno a uno",
      "Desafíos de fitness personalizados",
      "Acceso a recursos premium",
      "Técnicas avanzadas de recuperación",
    ],
    price: 59,
  },
];

const PlanesAdminView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>NUESTROS</span>
        <span className={styles.greenText}>PLANES</span>
      </h2>
      <div className={styles.cardsContainer}>
        {planes.map((plan) => (
          <div key={plan.id} className={styles.card}>
            <div className={styles.titulo}>{plan.name}</div>
            <p className={styles.cardDescription}>{plan.description}</p>
            <div className={styles.planContainer}>
              <h3 className={styles.planTitle}>Características</h3>
            </div>
            <ul className={styles.cardFeatures}>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className={styles.price}>{plan.price}$</div>
            <div className={styles.buttonsContainer}>
              <button
                className="submitButton submitButton:hover "
                onClick={() => (window.location.href = `/editar-plan/${plan.id}`)}
              >
                Editar Plan
              </button>
              <button
                className="submitButtonSuspend ml-4"
                onClick={() => (window.location.href = `/suspender-plan/${plan.id}`)}
              >
                Suspender Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanesAdminView;
