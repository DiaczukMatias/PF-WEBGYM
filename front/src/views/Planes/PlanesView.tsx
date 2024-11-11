import React from "react";
import styles from "./PlanesView.module.css";

const PlanesView: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>NUESTROS</span>{" "}
        <span className={styles.greenText}>PLANES</span>
      </h2>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>PRO PLAN</h3>
          <p>
            Nuestro Plan Pro ofrece entrenamientos avanzados y asesoramiento
            personalizado en nutrición para ayudarte a alcanzar tus objetivos
            más rápido. ¡Regístrate ahora!
          </p>
          <ul>
            <li>Acceso a todos nuestros videos de ejercicios</li>
            <li>Seguimiento de progreso</li>
            <li>Comunidad en línea de apoyo</li>
            <li>Planes de entrenamiento avanzados y personalizados</li>
            <li>Asesoramiento completo en nutrición</li>
            <li>Acceso a programas de entrenamiento avanzados</li>
            <li>Análisis de composición corporal</li>
          </ul>
          <div className={styles.price}>99$/USDT</div>
          <button className={styles.button}>ELEGIR PLAN</button>
        </div>

        <div className={styles.card}>
          <h3>PLAN BÁSICO</h3>
          <p>
            Nuestro Plan Básico es perfecto para aquellos que desean comenzar
            con el fitness, ofreciendo una forma simple y asequible de entrenar
            regularmente.
          </p>
          <ul>
            <li>Acceso a videos de ejercicios básicos</li>
            <li>Seguimiento de progreso</li>
            <li>Soporte de la comunidad</li>
            <li>Consejos básicos de nutrición</li>
            <li>Actualizaciones por correo electrónico semanales</li>
            <li>Acceso a desafíos grupales</li>
            <li>Revisiones mensuales de estado físico</li>
          </ul>
          <div className={styles.price}>19$/USDT</div>
          <button className={styles.button}>ELEGIR PLAN</button>
        </div>

        <div className={styles.card}>
          <h3>PLAN CUSTOMIZADO</h3>
          <p>
            Crea tu propio plan personalizado según tus necesidades específicas.
            Perfecto para quienes desean un enfoque más personalizado en el
            fitness y la nutrición.
          </p>
          <ul>
            <li>Videos de entrenamiento personalizados</li>
            <li>Asesoramiento nutricional personalizado</li>
            <li>Seguimiento de progreso personalizado</li>
            <li>Sesiones de coaching uno a uno</li>
            <li>Desafíos de fitness personalizados</li>
            <li>Acceso a recursos premium</li>
            <li>Técnicas avanzadas de recuperación</li>
          </ul>
          <div className={styles.price}>59$/USDT</div>
          <button className={styles.button}>ELEGIR PLAN</button>
        </div>
      </div>
    </div>
  );
};

export default PlanesView;
