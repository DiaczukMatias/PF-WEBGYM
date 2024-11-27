/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import styles from "./ProfileView.module.css";
import { useSession } from "next-auth/react";
import { IClase } from "@/interfaces/IClase";
import { clasesData } from "@/helpers/datatemporalClases";
//import { IUsuario } from "@/interfaces/IUser";
import { profesoresData } from "@/helpers/datatemporalClases";
import { IProfesor } from "@/interfaces/IProfesor";

const ProfileProfesor: React.FC = () => {
  const { data: session } = useSession();
  console.log('session en profileProfesor', session);

  const userName = session?.user.name || "Usuario";
  const userMail = session?.user.email || "Email";
  const userTel = session?.user.telefono || "telefono";
  const userImagen = session?.user.image || "/images/profesor/jessicaroberts.png"
  const userID = session?.user.id || ""

  const [activeTab, setActiveTab] = useState<"ALUMNOS" | "CLASES">("ALUMNOS");
  const [userClasses, setUserClasses] = useState<IClase[] | null>(null);
  const [userAlumnos, setUserAlumnos] = useState<IProfesor[] | null>(null);

  const [error, setError] = useState<string | null>(null);

  const database = true; // Cambia esto entre true/false según la necesidad
  // Si no hay base de datos (cuando database = false), usamos los datos temporales


  // obetener clases del profesor cambiar para  fetchCLasesPROfesor

  const fetchUserData = () => {
    if (database) {
      // Cuando la base de datos esté habilitada, usamos la información de la sesión del usuario.
    /*  if (session?.user) {
        
        const usuario= session.user ;
   // get perfilprofesor segun usuarioId
        // Asignamos los clases del profesor si existe
        setMembership(perfilProfesor.clases || null);

        //  usuarios inscritos a las clases del profesor
        const clasesInscritas: IClase[] | null = 
            usuario?.inscripciones?.flatMap((inscripcion: IInscripcion) => inscripcion.clase) || null;
       
        setUserClasses(clasesInscritas && clasesInscritas.length > 0 ? clasesInscritas : null);
      }
   } else {  //hacer fetch de los alumnos  del profesor, de inscriptos en la clase del profesor
     */ setUserAlumnos(profesoresData);

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
            <p className="flex0 justify-center  text-center mt-4">No tienes ninguna clase.</p>
            <p className="flex text-center  justify-center m-2">  Crea tus clases:</p></div>

          <div className="flex justify-center items-center m-4">
            <button
              className="submitButton .submitButton:hover"
              onClick={() => window.location.href = `/crearClase`}
            >
              Crear Clase
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
                    Incriptos:  {clase.inscripciones?.length || "No hay isncriptos"}
                  </p>
                </div>
              </div>

              <hr className={styles.separator} />
            </div>
          ))}
        </div>
        <button
          className="submitButton .submitButton:hover"
          onClick={() => window.location.href = `/crearClase`}
        >
          Crear Clase
        </button>
      </div>
    );
  };


  const renderAlumnos = () => {
    if (!userAlumnos || userAlumnos.length === 0) {
      return (
        <div>
          <div className=" m-4 p-4">
            <p className="flex0 justify-center  text-center mt-4">No tienes ninguna clase.</p>
            <p className="flex text-center  justify-center m-2">  Crea tus clases:</p></div>

          <div className="flex justify-center items-center m-4">
            <button
              className="submitButton .submitButton:hover"
              onClick={() => window.location.href = `/crearClase`}
            >
              Crear Clase
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          {userAlumnos.map((profesor /*usuario */) => (
            <div key={profesor.id} className={styles.classItem}>
              <h4 className={styles.className}>{profesor.nombre.toUpperCase() /*usuario.nomnre */}</h4>
              <div className={styles.cardClass}>
                <div className={styles.classImageContainer}>
                  <img src={profesor.imagen || `/images/profesor/${profesor.nombre.toLowerCase()}png`} alt={profesor.nombre} className={styles.classImage} />
                </div>
                <div className={styles.classDetails}>
                  <p className={styles.classDate}>{userTel /*usuario.telefono*/}</p>
                  <p className={styles.classProfessor}>
                    {userMail /*usuario.email*/}
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
      {/* Sección de perfil del entrenador */}
      <div className={styles.profileSection}>
        <div className={styles.profilePictureContainer}>
          <img
            src={userImagen}
            alt="Profile"
            className={styles.profilePicture}
          />
        </div>
        <h2 className={styles.role}>Gym Coach</h2>
        <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
        <h3 className={`${styles.name} ${styles.oswaldText}`}>
          {userName.toUpperCase()}
        </h3>
        <ul className={styles.contactInfo}>
          <li>📞 +{userTel} </li>
          <li>📧 {userMail}</li>
          <li>📸 @{userName}couchgym</li>
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

      {/* Sección de Alumnos y Clases */}
      <div className={styles.studentsSection}>
        <div className={styles.tabs}>
          <span
            className={`${styles.tab} ${activeTab === "ALUMNOS" ? styles.activeTab : ""} ${styles.oswaldText}`}
            onClick={() => setActiveTab("ALUMNOS")}
          >
            ALUMNOS
          </span>
          <span className={styles.tabSeparator}>|</span>
          <span
            className={`${styles.tab} ${activeTab === "CLASES" ? styles.activeTab : ""} ${styles.oswaldText}`}
            onClick={() => setActiveTab("CLASES")}
          >
            CLASES
          </span>
        </div>

        {activeTab === "CLASES" ? renderClasses() : (renderAlumnos())}
        
      </div>
    </div>
  );
}
export default ProfileProfesor;