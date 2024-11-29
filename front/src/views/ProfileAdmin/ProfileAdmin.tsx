/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import styles from "./ProfileAdmin.module.css";
import { useSession } from "next-auth/react";

const ProfileAdmin: React.FC = () => {
  const { data: session } = useSession();
  console.log('session en profileUser', session);

  const userName = session?.user?.name || "Usuario";  // Corregido por posible undefined
  const userMail = session?.user?.email || "Email";
  const userTel = session?.user?.telefono || "Telefono";
  const userIMG = session?.user?.image || "/FOTOPERFIL.png"; // Imagen predeterminada
  const userID = session?.user.id || ''



  return (
    <div className={styles.container}>
      {/* Sección de perfil del admin */}
      <div className={styles.profileSection}>
        <div className={styles.profilePictureContainer}>
          <img src={userIMG} alt="Profile" className={styles.profilePicture} />
        </div>
        <h3 className={`${styles.name} ${styles.oswaldText}`}>{userName.toUpperCase()}</h3>
        <ul className={styles.contactInfo}>
          <li>📞 +{userTel}</li>
          <li>📧 {userMail}</li>
        </ul>
        <div className="flex justify-center items-center m-4">
                  <button
                  className="submitButton .submitButton:hover"
                   onClick={() => window.location.href = `/editar-usuario/${userID}`}
                    >
                      Editar Perfil
                  </button>
                </div>
      </div>

      <div className={styles.studentsSection}>
      <div className="flex justify-center items-center m-4 w-1/2">
           <button
            className="submitButton .submitButton:hove w-minr"
            onClick={() => window.location.href = `/admin`}
          >
            DASHBOARD ADMINISTRADOR
          </button>
          </div>  
      </div>
    </div>
  );
};

export default ProfileAdmin;
