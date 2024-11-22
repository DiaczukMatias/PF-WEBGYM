// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import styles from "./PlanesView.module.css";

// export const planes = [
//   {
//     id: "1",
//     name: "PRO PLAN",
//     description:
//       "Nuestro Plan Pro ofrece entrenamientos avanzados y asesoramiento personalizado en nutrición para ayudarte a alcanzar tus objetivos más rápido. ¡Regístrate ahora!",
//     features: [
//       "Acceso a todos nuestros videos de ejercicios",
//       "Seguimiento de progreso",
//       "Comunidad en línea de apoyo",
//       "Planes de entrenamiento avanzados y personalizados",
//       "Asesoramiento completo en nutrición",
//       "Acceso a programas de entrenamiento avanzados",
//       "Análisis de composición corporal",
//     ],
//     price: 99,
//     link: "https://buy.stripe.com/test_dR6cQt5xWgzKbTOcMP",
//     buttonText: "ELEGIR PLAN",
//   },
//   {
//     id: "2",
//     name: "PLAN BÁSICO",
//     description:
//       "Nuestro Plan Básico es perfecto para aquellos que desean comenzar con el fitness, ofreciendo una forma simple y asequible de entrenar regularmente.",
//     features: [
//       "Acceso a videos de ejercicios básicos",
//       "Seguimiento de progreso",
//       "Soporte de la comunidad",
//       "Consejos básicos de nutrición",
//       "Actualizaciones por correo electrónico semanales",
//       "Acceso a desafíos grupales",
//       "Revisiones mensuales de estado físico",
//     ],
//     price: 19,
//     link: "https://buy.stripe.com/test_28o9Ehd0ogzKga4bIN",
//     buttonText: "ELEGIR PLAN",
//   },
//   {
//     id: "3",
//     name: "PLAN CUSTOMIZADO",
//     description:
//       "Crea tu propio plan personalizado según tus necesidades específicas. Perfecto para quienes desean un enfoque más personalizado en el fitness y la nutrición.",
//     features: [
//       "Videos de entrenamiento personalizados",
//       "Asesoramiento nutricional personalizado",
//       "Seguimiento de progreso personalizado",
//       "Sesiones de coaching uno a uno",
//       "Desafíos de fitness personalizados",
//       "Acceso a recursos premium",
//       "Técnicas avanzadas de recuperación",
//     ],
//     price: 59,
//     link: "https://buy.stripe.com/test_eVaeYB9Oc83e8HCcMQ",
//     buttonText: "ELEGIR PLAN",
//   },
// ];

// const PlanesView: React.FC = () => {
//   const router = useRouter();

//   // const handleSelectPlan = (planId: string) => {
//   //   router.push(`/checkout/${planId}`);
//   // };

//   const handleSelectPlan = (planLink: string) => {
//     router.push(planLink);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>
//         <span className={styles.whiteText}>NUESTROS</span>
//         <span className={styles.greenText}>PLANES</span>
//       </h2>
//       <div className={styles.cardsContainer}>
//         {planes.map((plan) => (
//           <div key={plan.id} className={styles.card}>
//             <div className={styles.titulo}>
//               <h3>{plan.name}</h3>
//             </div>
//             <p>{plan.description}</p>
//             <div className={styles.planContainer}>
//               <h3>Caracteristicas</h3>
//             </div>
//             <ul>
//               {plan.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//             <div className={styles.price}>{plan.price}$</div>

//             <button
//               className={styles.button}
//               onClick={() => handleSelectPlan(plan.link)}
//             >
//               {plan.buttonText}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlanesView;

// handleSelectPlan(plan.id)

"use client";
import React from "react";
import styles from "./PlanesView.module.css";
import { loadStripe } from "@stripe/stripe-js";

export const planes = [
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
    link: "https://buy.stripe.com/test_dR6cQt5xWgzKbTOcMP",
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
    link: "https://buy.stripe.com/test_28o9Ehd0ogzKga4bIN",
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
    link: "https://buy.stripe.com/test_eVaeYB9Oc83e8HCcMQ",
    buttonText: "ELEGIR PLAN",
  },
];

const PlanesView: React.FC = () => {
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.whiteText}>NUESTROS</span>
        <span className={styles.greenText}>PLANES</span>
      </h2>
      <div className={styles.cardsContainer}>
        {planes.map((plan) => (
          <div key={plan.id} className={styles.card}>
            <div className={styles.titulo}>
              <h3>{plan.name}</h3>
            </div>
            <p>{plan.description}</p>
            <div className={styles.planContainer}>
              <h3>Caracteristicas</h3>
            </div>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className={styles.price}>{plan.price}$</div>

            <button
              className={styles.button}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanesView;
