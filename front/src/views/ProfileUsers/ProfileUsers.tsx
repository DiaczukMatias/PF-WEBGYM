"use client";
import React, { useState } from "react";
import styles from "./ProfileUsers.module.css";
import { useSession } from "next-auth/react";

const ProfileUser: React.FC = () => {
  const { data: session } = useSession();
  const userName = session?.user.name || "Usuario";
  const userMail = session?.user.email || "Email";

  const userTel = session?.user.telefono || "telefono";
  const userIMG = /*session?.user.image || */ "/FOTOPERFIL.png";

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState<"MIS_CLASES" | "PLAN_ACTUAL">(
    "MIS_CLASES"
  );

  return (
    <div className={styles.container}>
      {/* Sección de perfil del entrenador */}
      <div className={styles.profileSection}>
        <div className={styles.profilePictureContainer}>
          <img src={userIMG} alt="Profile" className={styles.profilePicture} />
        </div>

        <h3 className={`${styles.name} ${styles.oswaldText}`}>
          {userName.toUpperCase()}
        </h3>
        <ul className={styles.contactInfo}>
          <li>📞 +{userTel} </li>
          <li>📧 {userMail}</li>
          <li>📸 @{userName}couchgym</li>
        </ul>
      </div>

      {/* Sección de Alumnos y Clases */}
      <div className={styles.studentsSection}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <span
            className={`${styles.tab} ${
              activeTab === "MIS_CLASES" ? styles.activeTab : ""
            } ${styles.oswaldText}`}
            onClick={() => setActiveTab("MIS_CLASES")}
          >
            MIS CLASES
          </span>
          <span className={styles.tabSeparator}>|</span>
          <span
            className={`${styles.tab} ${
              activeTab === "PLAN_ACTUAL" ? styles.activeTab : ""
            } ${styles.oswaldText}`}
            onClick={() => setActiveTab("PLAN_ACTUAL")}
          >
            PLAN ACTUAL
          </span>
        </div>

        {/* Contenido basado en la pestaña activa */}
        {activeTab === "MIS_CLASES" ? (
          <div className={styles.studentList}>
            <div className={styles.student}>
              <img
                src="/images/profesor/profe2.png"
                alt="Student 2"
                className={styles.studentPicture}
              />
              <div className={styles.studentInfo}>
                <h4>CARDIO</h4>
                <p>📞 (303) 555-0121 📧 devonlane@gmail.com</p>
              </div>
            </div>
            <hr className={styles.separator} />

            <div className={styles.student}>
              <img
                src="/images/profesor/profe1.png"
                alt="Student 3"
                className={styles.studentPicture}
              />
              <div className={styles.studentInfo}>
                <h4>CROSSFIT</h4>
                <p>📞 (303) 555-0121 📧 chrisjames@gmail.com</p>
              </div>
            </div>
            <hr className={styles.separator} />
          </div>
        ) : (
          <div className={styles.membershipCard}>
            <h3>PRO PLAN</h3>
            <p>$50 USDT</p>
          </div>
        )}
        <p className={styles.changeplan}>
          Si te gustaria cambiar de plan hace click aca
        </p>
      </div>
    </div>
  );
};

export default ProfileUser;
