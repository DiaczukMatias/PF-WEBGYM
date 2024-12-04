/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import styles from "@/views/ProflleProfesor/ProfileView.module.css";
import { useSession } from "next-auth/react";
import { IClase } from "@/interfaces/IClase";
import { clasesData } from "@/helpers/datatemporalClases";
import { fetchPerfilProfesorById /*fetchClasesPorProfesor*/ } from "@/helpers/Fetch/FetchProfesores";
import { IUsuario, RolEnum } from "@/interfaces/IUser";
import { fetchUserById } from "@/helpers/Fetch/FetchUsers";

const ProfileProfesor: React.FC = () => {
  const { data: session } = useSession();
  console.log('session en profileProfesor', session);

  const userName = session?.user.name || "Usuario";
  const userMail = session?.user.email || "Email";
  const userTel = session?.user.telefono || "telefono";
 
  const userID = session?.user.id || ""
  const [userIMG, setUserIMG] = useState<string>(session?.user.image|| "/FOTOPERFIL.png");
  const [activeTab, setActiveTab] = useState<"ALUMNOS" | "CLASES">("ALUMNOS");
  const [userClasses, setUserClasses] = useState<IClase[] | null>(null);
  const [userAlumnos, setUserAlumnos] = useState<IUsuario[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const database = true; 
  // Si no hay base de datos (cuando database = false), usamos los datos temporales
  
   // fetch para tener la imagen actualizada al editar
   useEffect(() => {
    const fetchUserForImage = async () => {
      try {
        
        const data = await fetchUserById(session?.user.id || "");
        setUserIMG(data.imagen);
      } catch (error) {
        console.error(error)
        ;
      }
    };

    fetchUserForImage();
  }, []);

  useEffect(() => {
  const fetchUserData = async () => {
    if (database) {
        try {
          if (!session?.user.id) {
            setError('No se encontró el ID del usuario en la sesión.');
            return;
          }
          const usuarioId = session?.user.id;
          if (!session?.user.accessToken) {
            setError('No tienes la autorizacion para acceder a esta información');
            return;
          }
          const fetchedPerfilProfesor = await   fetchPerfilProfesorById(usuarioId, session.user.accessToken);  //para obtener el perfilprofesorID con el  id usuario
           console.log("perfilprofesor:", fetchedPerfilProfesor)

            // Extraer las clases del objeto perfil del profesor
          const clasesProfesor = fetchedPerfilProfesor.clases || [];

          if (!clasesProfesor) {
            setError('No se encontró el perfilProfesorId.');
            return;
          }

           // Guardar las clases en el estado
           setUserClasses(clasesProfesor);
           setError(null); // Limpiar errores
 
             // Aquí vamos a almacenar todos los usuarios inscritos junto con la clase
        const usuariosInscritos: IUsuario[] = [];

        clasesProfesor.forEach((clase) => {
          if (clase.inscripciones && clase.inscripciones.length > 0) {
            clase.inscripciones.forEach((inscripcion) => {
              if (inscripcion.usuario && inscripcion.usuario.length > 0) {
                inscripcion.usuario.forEach((usuario) => {
                  // Asociamos cada usuario con el nombre de la clase
                  usuariosInscritos.push({
                    ...usuario,
                    clase: clase.nombre,  // Añadimos el nombre de la clase
                  });
                });
              }
            });
          }
        });

        // Actualizar el estado con los usuarios inscritos
        setUserAlumnos(usuariosInscritos);
        setError(null); // Limpiar cualquier error

          } catch (error) {
            console.error('Error al obtener datos del backend:', error);
            setError('Ocurrió un error al obtener los datos.');
          }
   } else {

      // Si `database` es falso, usar datos temporales
        setUserClasses(clasesData); // Reemplaza `clasesData` por tus datos temporaleszzzzzz      setUserAlumnos(

      setUserAlumnos(
     [  {
    id: "1",
    nombre: "alumno1",
    edad: 30,
    email: "alumno@mail.com",
    telefono: 123456789,
    rol: RolEnum.CLIENTE, 
       },
       {
        id: "2",
        nombre: "alumno2",
        edad: 32,
        email: "alumno@mail.com",
        telefono: 123456789,
        rol: RolEnum.CLIENTE, 
           },
           {
            id: "3",
            nombre: "alumno3",
            edad: 33,
            email: "alumno@mail.com",
            telefono: 123456789,
            rol: RolEnum.CLIENTE, 
               },
      ]); 

      setError(null);
      console.log('log del error', error)
    }
  };
    fetchUserData(); // Llamamos a la función para cargar los datos cuando se monta el componente
  }, [database, session]);


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
       
          <div className=" m-4 p-4">
            <p className="flex0 justify-center  text-center mt-4">No tienes ningun inscripto a tus clases.</p>
        </div>
      );
    }

    return (
      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          {userAlumnos.map((usuario ) => (
            <div key={usuario.id} className={styles.classItem}>
              <h4 className={styles.className}>{usuario.nombre.toUpperCase() /*usuario.nomnre */}</h4>
              <div className={styles.cardClass}>
                <div className={styles.classDetails}>
                  <p className={styles.classDate}>{usuario.telefono}</p>
                  <p className={styles.classProfessor}>
                    {usuario.email}
                  </p>
                  <p className={styles.classProfessor}>
                    {usuario.edad}
                  </p>
                  <p className={styles.classProfessor}>{usuario.clase}</p>
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
            src={userIMG}
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