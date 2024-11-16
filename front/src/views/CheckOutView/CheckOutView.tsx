// import React from "react";
// import styles from "./CheckOut.module.css";

// interface Plan {
//   name: string;
//   description: string;
//   features: string[];
//   price: number;
// }

// interface CheckOutProps {
//   selectedPlan: Plan;
// }

// const CheckOutView: React.FC<CheckOutProps> = ({ selectedPlan }) => {
//   if (!selectedPlan) {
//     return <p>Plan no encontrado</p>;
//   }
//   return (
//     <div className={styles.checkoutContainer}>
//       <div className={styles.checkoutBox}>
//         <h2 className={styles.checkoutTitle}>CHECKOUT</h2>
//         <p className={styles.checkoutSubtitle}>
//           Por favor, ingresa los detalles de tu tarjeta de crédito para
//           continuar con el pago
//         </p>

//         <form className={styles.form}>
//           <div className={styles.formGroup}>
//             <label htmlFor="cardNumber">Card Number</label>
//             <input
//               type="text"
//               id="cardNumber"
//               placeholder="1234 - 4548 - 5614 - 9745"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="cardHolderName">Card Holders Name</label>
//             <input
//               type="text"
//               id="cardHolderName"
//               placeholder="David Handsome"
//             />
//           </div>
//           <div className={styles.formGroupInline}>
//             <div className={styles.formGroup}>
//               <label htmlFor="expirationDate">Expiration Date</label>
//               <input type="text" id="expirationDate" placeholder="05/2030" />
//             </div>
//             <div className={styles.formGroup}>
//               <label htmlFor="verificationCode">Verification code</label>
//               <input type="text" id="verificationCode" placeholder="546" />
//             </div>
//           </div>
//           <div className={styles.total}>
//             <span>Total</span>
//             <span className={styles.price}>${selectedPlan.price}</span>
//           </div>
//           <button type="submit" className={styles.paymentButton}>
//             PROCEED PAYMENT
//           </button>
//         </form>
//       </div>

//       <div className={styles.planBox}>
//         <h2 className={styles.planTitle}>{selectedPlan.name}</h2>
//         <h3>Description</h3>
//         <p>{selectedPlan.description}</p>
//         <h3>Features</h3>
//         <ul>
//           {selectedPlan.features.map((feature, index) => (
//             <li key={index}>{feature}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CheckOutView;
