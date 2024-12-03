"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/stripe/pay/success/checkout/session/mensaje.module.css"

const SuccessPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/home");
  };

  return (
    <div className={styles.card}>
      <h1>¡Pago Exitoso!</h1>
      <p>Tu pago fue procesado con éxito.</p>

      <button onClick={handleRedirect}>VOLVER AL HOME</button>
    </div>
  );
};

export default SuccessPage;
