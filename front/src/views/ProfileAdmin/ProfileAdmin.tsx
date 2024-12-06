/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "@/views/ProfileAdmin/ProfileAdmin.module.css";
import { fetchUserById } from "@/helpers/Fetch/FetchUsers";
import { IUsuario } from "@/interfaces/IUser";
const ProfileAdmin: React.FC = () => {
  const { data: session } = useSession();

 /* const userName = session?.user?.name || "Usuario";  // Corregido por posible undefined
  const userMail = session?.user?.email || "Email";
  const userTel = session?.user?.telefono || "Telefono";*/
  
  const userID = session?.user.id || ''
  const [userIMG, setUserIMG] = useState<string>(session?.user.image|| "/FOTOPERFIL.png");
  const [userData, setUserData] = useState<IUsuario | null>(null)

  useEffect(() => {
    const fetchUserForImage = async () => {
      try {
        
        const data = await fetchUserById(session?.user.id || "");
        setUserIMG(data.imagen);
        setUserData(data)
      } catch (error) {
        console.error(error)
        ;
      }
    };

    fetchUserForImage();
  }, []);


  return (
    <div className={styles.container}>
      {/* Sección de perfil del admin */}
      <div className={styles.profileSection}>
        <div className={styles.profilePictureContainer}>
          <img src={userIMG} alt="Profile" className={styles.profilePicture} />
        </div>
        <h3 className={`${styles.name} ${styles.oswaldText}`}>{userData?.nombre.toUpperCase()}</h3>
        <ul className={styles.contactInfo}>
          <li>📞 +{userData?.nombre}</li>
          <li>📧 {userData?.email}</li>
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
