"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { validateEditUserForm } from "@/helpers/validate/validate";
import { fetchUserById, updateUser } from "@/helpers/Fetch/FetchUsers";
import { IEditUserErrors, IEditUserProps } from "@/interfaces/IEditUser";
import styles from "./Register.module.css";

const EditUserForm: React.FC = () => {
  const [id, setId] = useState<string>(""); // ID del usuario
  const [dataUser, setDataUser] = useState<IEditUserProps>({
    nombre: "",
    email: "",
    image: null,
    edad: 0,
    telefono: 0,
  }); // Datos del usuario
  const [errors, setErrors] = useState<IEditUserErrors>({});
  const [inputBlur, setInputBlur] = useState<Partial<IEditUserProps>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío

  // Obtener ID del usuario desde la URL
  useEffect(() => {
    const pathname = window?.location?.pathname;
    const extractedId = pathname.split("/").pop() || "";
    console.log("ID extraído de la URL:", extractedId)
    setId(extractedId);
  }, []);

  // Obtener datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const usuarioXId = await fetchUserById(id);
          setDataUser({
            nombre: usuarioXId.nombre,
            email: usuarioXId.email,
            image: null, // La imagen no se usa actualmente
            edad: usuarioXId.edad,
            telefono: usuarioXId.telefono,
          });
        }
      } catch (error) {
        console.error("Error al fetchear usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al cargar los datos del usuario.",
        });
      }
    };

    fetchUserData();
  }, [id]);

  // Validar formulario cuando cambien los datos
  useEffect(() => {
    const validationErrors = validateEditUserForm(dataUser);
    setErrors(validationErrors);
  }, [dataUser]);

  // Habilitar o deshabilitar el botón de envío
  useEffect(() => {
    setIsSubmitDisabled(Object.keys(errors).length > 0 || isSubmitting);
  }, [errors, isSubmitting]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setInputBlur({ ...inputBlur, [name]: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.keys(errors).length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hay errores en el formulario",
      });
      return;
    }

    const formattedDataUser = {
      ...dataUser,
      edad: Number(dataUser.edad),
      telefono: Number(dataUser.telefono),
    };

    setIsSubmitting(true); // Desactivar el botón al iniciar el envío

    try {
      await updateUser(id, formattedDataUser);
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire("Error", "Hubo un error al actualizar el usuario", "error");
    } finally {
      setIsSubmitting(false); // Reactivar el botón después del envío
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h2 className={styles.h2}>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label htmlFor="name" className={styles.label}>Nombre</label>
            <input
              id="name"
              name="nombre"
              type="text"
              value={dataUser.nombre}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Nombre"
              className={styles.inputField}
            />
            {inputBlur.nombre && errors.nombre && (
              <span className={styles.errorMessage}>{errors.nombre}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={dataUser.email}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Email"
              className={styles.inputField}
            />
            {inputBlur.email && errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className={styles.label}>Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={dataUser.telefono || ""}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Teléfono"
              className={styles.inputField}
            />
            {inputBlur.telefono && errors.telefono && (
              <span className={styles.errorMessage}>{errors.telefono}</span>
            )}
          </div>

          {/* Edad */}
          <div>
            <label htmlFor="edad" className={styles.label}>Edad</label>
            <input
              id="edad"
              name="edad"
              type="number"
              value={dataUser.edad || ""}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Edad"
              className={styles.inputField}
            />
            {inputBlur.edad && errors.edad && (
              <span className={styles.errorMessage}>{errors.edad}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={styles.submitButton}
          >
            {isSubmitting ? "Enviando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditUserForm;
