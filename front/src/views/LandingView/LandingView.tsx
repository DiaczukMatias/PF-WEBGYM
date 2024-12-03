"use client";
import React from "react";
import styles from "@/views/LandingView/Landing.module.css"
import { useRouter } from "next/navigation";


const LandingView: React.FC = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>
          LISTO PARA ENTRENAR <span>TU CUERPO</span>
        </h1>
        <p>Forja tu fuerza. Da forma a tu futuro.</p>
        <div className={styles.stats}>
          <div>
            <h2>20+</h2>
            <p>Años de experiencia</p>
          </div>
          <div>
            <h2>15K+</h2>
            <p>Miembros que se han unido</p>
          </div>
          <div>
            <h2>14K+</h2>
            <p>Miembros felices</p>
          </div>
        </div>
        <button
          className={styles.startButton}
          onClick={() => router.push("/home")}
        >
          COMENZAR AHORA
        </button>
      </section>
    </main>
  );
};

export default LandingView;
