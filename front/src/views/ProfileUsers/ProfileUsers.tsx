/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import styles from "@/views/ProfileUsers/ProfileUsers.module.css";
import { useSession } from "next-auth/react";
import { IClase } from "@/interfaces/IClase";
import { IMembresia } from "@/interfaces/IMembresia";
import { clasesData } from "@/helpers/datatemporalClases";
import { IInscripcion } from "@/interfaces/IInscripcion";
import { fetchInscripcionesConClase } from "@/helpers/Fetch/FetchIncripciones";
import { fetchUserById } from "@/helpers/Fetch/FetchUsers";
import { IUsuario } from "@/interfaces/IUser";

const ProfileUser: React.FC = () => {
  const { data: session } = useSession();
  console.log("session en profileUser", session);


  const userID = session?.user.id

  
  const [activeTab, setActiveTab] = useState<"MIS_CLASES" | "PLAN_ACTUAL">("MIS_CLASES");
  const [userIMG, setUserIMG] = useState<string>(session?.user.image || "/FOTOPERFIL.png");
  const [userClasses, setUserClasses] = useState<IClase[] | null>(null);

  const [userData, setUserData]= useState<IUsuario | null>(null)

  const [membresia, setMembresia] = useState<IMembresia | null>(null);
  const [error, setError] = useState<string | null>(null);

  const database = true; // Cambia esto entre true/false según la necesidad

  // Función para obtener las clases del usuario 
  const fetchUserData = async () => {
    if (database) {
      // Cuando la base de datos esté habilitada, usamos la información de la sesión del usuario.
      if (session?.user) {
    
        //  clases a las que el usuario está inscrito
        const inscripcion = await fetchInscripcionesConClase(session.user.id)
        console.log( "inscripciones del usuario", inscripcion)
        const clasesInscritas: IClase[] | null =
          inscripcion.flatMap(
            (inscripcion: IInscripcion) => inscripcion.clase
          ) || null;

        setUserClasses(
          clasesInscritas && clasesInscritas.length > 0 ? clasesInscritas : null
        );
      }
    } else {
      // Si no hay base de datos (cuando database = false), usamos los datos temporales

      // Datos temporales de clases (clasesData)
      setUserClasses(clasesData);

      setError(null);
      console.log("log del error", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Llamamos a la función para cargar los datos cuando se monta el componente
  }, [session]);

   
   // fetch para tener la imagen actualizada al editar
   useEffect(() => {
    const fetchUserForImage = async () => {
      try {
        
        const data = await fetchUserById(session?.user.id || "");
        setUserData(data)
        setUserIMG(data.imagen);
        
         setMembresia(data.membresia || null);
      } catch (error) {
        console.error(error)
        ;
      }
    };

    fetchUserForImage();
  }, []);
  const renderClasses = () => {
    if (!userClasses || userClasses.length === 0) {
      return (
        <div>
          <div className=" m-4 p-4">
            <p className={styles.changeseccion}>
              No estás inscrito en ninguna clase. Ve a ver nuestras clases
              disponibles:
            </p>
          </div>

          <div className="flex justify-center items-center m-4 ">
            <button
              className="submitButton .submitButton:hover"
              onClick={() => (window.location.href = `/clases`)}
            >
              EXPLORAR CLASES
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
               {/* <div className={styles.classImageContainer}>
                  <img
                    src={
                      clase.imagen ||
                      `/images/clases/${clase.nombre.toLowerCase()}.jpg`
                    }
                    alt={clase.nombre}
                    className={styles.classImage}
                  />
                </div>*/}
                <div className={styles.classDetails}>
                  <p className={styles.classDate}>
                    {new Date(clase.fecha).toLocaleDateString()}
                  </p>
                  <p className={styles.classProfessor}>
                    Profesor: {clase.perfilProfesor?.nombre || "No asignado"}
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
        <h3 className={`${styles.name} ${styles.oswaldText}`}>
          {userData?.nombre.toUpperCase()}
        </h3>
        <ul className={styles.contactInfo}>
          <li>📞 +{userData?.telefono}</li>
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

      {/* Sección de Clases y plan */}
      <div className={styles.studentsSection}>
        <div className={styles.tabs}>
          <span
            className={`${styles.tab} ${
              activeTab === "MIS_CLASES" ? styles.activeTab : ""
            } ${styles.oswaldText}`}
            onClick={() => setActiveTab("MIS_CLASES")}
          >
            MIS CLASES
          </span>
          <span className={styles.tabSeparator}></span>
          <span
            className={`${styles.tab} ${
              activeTab === "PLAN_ACTUAL" ? styles.activeTab : ""
            } ${styles.oswaldText}`}
            onClick={() => setActiveTab("PLAN_ACTUAL")}
          >
            PLAN ACTUAL
          </span>
        </div>

        {activeTab === "MIS_CLASES" ? (
          renderClasses()
        ) : (
          <div className={styles.plan}>

            <button  onClick={() => (window.location.href = `/miMembrasia`)} className={styles.membershipCard}>
            <h3>{membresia?.nombre || "No tienes plan activo"}</h3>
            <p>{membresia ? `$${membresia.precio} USD` : "Hazte socio para poder disfrutar de nuestras clases y todos los beneficios"}</p>
            <p >
              {membresia ? (
                <>
               Vence: {membresia.fechaExpiracion ? new Date(membresia.fechaExpiracion).toLocaleDateString() : "Fecha no disponible"}                </>
              ) : ("")}
            </p>
           
          </button> <hr className={styles.separator} />
            <div className="flex justify-center">
              <button
              className="submitButton .submitButton:hover "
              onClick={() => (window.location.href = `/planes`)}
            >

              {membresia ? "Cambiar plan" : "Ver planes"}
            </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
