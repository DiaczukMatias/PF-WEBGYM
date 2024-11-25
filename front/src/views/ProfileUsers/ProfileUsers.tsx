/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import styles from "./ProfileUsers.module.css";
import { useSession } from "next-auth/react";
import { IClase } from "@/interfaces/IClase";
import { IMembresia } from "@/interfaces/IMembresia";
import { clasesData } from "@/helpers/datatemporalClases";
import { IInscripcion } from "@/interfaces/IInscripcion";

const ProfileUser: React.FC = () => {
  const { data: session } = useSession();
  console.log('session en profileUser', session);

  const userName = session?.user?.name || "Usuario";  // Corregido por posible undefined
  const userMail = session?.user?.email || "Email";
  const userTel = session?.user?.telefono || "Telefono";
  const userIMG = session?.user?.image || "/FOTOPERFIL.png"; // Imagen predeterminada


  
  const [activeTab, setActiveTab] = useState<"MIS_CLASES" | "PLAN_ACTUAL">("MIS_CLASES");
  const [userClasses, setUserClasses] = useState<IClase[] | null>(null);
  const [membership, setMembership] = useState<IMembresia | null>(null);
  const [error, setError] = useState<string | null>(null);

  const database = true; // Cambia esto entre true/false según la necesidad

  // Función para obtener las clases del usuario y la membresía
  const fetchUserData = () => {
    if (database) {
      // Cuando la base de datos esté habilitada, usamos la información de la sesión del usuario.
      if (session?.user) {
        
        const usuario= session.user ;

        // Asignamos la membresía si existe
        setMembership(usuario.membresia || null);

        //  clases a las que el usuario está inscrito
        const clasesInscritas: IClase[] | null = 
            usuario?.inscripciones?.flatMap((inscripcion: IInscripcion) => inscripcion.clase) || null;
       
        setUserClasses(clasesInscritas && clasesInscritas.length > 0 ? clasesInscritas : null);
      }
    } else {
      // Si no hay base de datos (cuando database = false), usamos los datos temporales
      setMembership({
        id: "1",
        nombre: "PRO PLAN",
        precio: 99,
        duracionEnMeses: 6,
        fechaCreacion: new Date(),
        fechaExpiracion: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        fechaActualizacion: new Date(),
        activo: true,
      });

      // Datos temporales de clases (clasesData)
      setUserClasses(clasesData);

      setError(null);
      console.log('log del error', error)
    }
  };

  useEffect(() => {
    fetchUserData(); // Llamamos a la función para cargar los datos cuando se monta el componente
  }, [session]);

  
  const renderClasses = () => {
    if (!userClasses || userClasses.length === 0) {
      return (
        <div>
          <div className=" m-4 p-4">
            <p className="flex0 justify-center  text-center mt-4">No estás inscrito en ninguna clase.</p>
          <p className="flex text-center  justify-center m-2">  Ve a ver nuestras clases disponibles:</p></div>
          
          <div className="flex justify-center items-center m-4">
            <button
            className="flex justify-center items-center m-2 p-2 text-accent border rounded-md border-accent"
            onClick={() => (window.location.href = `/clases`)}
          >
            Explorar clases
          </button>
            </div>
        </div>
      );
    }

    return (
      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          {userClasses.map((clase) => (
            <div key={clase.id} className={styles.classItem}>
             <h4 className={styles.className}>{clase.nombre.toUpperCase()}</h4>
             <div className={styles.cardClass}>
              <div className={styles.classImageContainer}>
                  <img src={clase.imagen || `/images/clases/${clase.nombre.toLowerCase()}.jpg`} alt={clase.nombre} className={styles.classImage} />
                </div>
              <div className={styles.classDetails}>
                <p className={styles.classDate}>{new Date(clase.fecha).toLocaleDateString()}</p>
                <p className={styles.classProfessor}>
                    Profesor:  {clase.perfilProfesor?.nombre || "No asignado"}
                  </p>
              </div>
              </div>
              
              <hr className={styles.separator} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Sección de perfil del cliente */}
      <div className={styles.profileSection}>
        <div className={styles.profilePictureContainer}>
          <img src={userIMG} alt="Profile" className={styles.profilePicture} />
        </div>
        <h3 className={`${styles.name} ${styles.oswaldText}`}>{userName.toUpperCase()}</h3>
        <ul className={styles.contactInfo}>
          <li>📞 +{userTel}</li>
          <li>📧 {userMail}</li>
        </ul>
      </div>

      {/* Sección de Clases y plan */}
      <div className={styles.studentsSection}>
        <div className={styles.tabs}>
          <span
            className={`${styles.tab} ${activeTab === "MIS_CLASES" ? styles.activeTab : ""} ${styles.oswaldText}`}
            onClick={() => setActiveTab("MIS_CLASES")}
          >
            MIS CLASES
          </span>
          <span className={styles.tabSeparator}>|</span>
          <span
            className={`${styles.tab} ${activeTab === "PLAN_ACTUAL" ? styles.activeTab : ""} ${styles.oswaldText}`}
            onClick={() => setActiveTab("PLAN_ACTUAL")}
          >
            PLAN ACTUAL
          </span>
        </div>

        {activeTab === "MIS_CLASES" ? renderClasses() : (
          <div className={styles.plan}>
            <button  onClick={() => (window.location.href = `/miMembrasia`)} className={styles.membershipCard}>
            <h3>{membership?.nombre || "No tienes plan activo"}</h3>
            <p>{membership ? `$${membership.precio} USD` : "Hazte socio para poder disfrutar de nuestras clases y todos los beneficios"}</p>
            <p >
              {membership ? (
                <>
                  Vence: {new Date(membership.fechaExpiracion).toLocaleDateString()}
                </>
              ) : ("")}
            </p>
           
          </button> <hr className={styles.separator} />
            <button
              className={styles.changeplan}
              onClick={() => (window.location.href = `/planes`)}
            >
              {membership ? "Si te gustaría cambiar de plan haz clic aquí" : "Ver planes"}
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
