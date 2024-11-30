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
    edad: "",
    telefono: "",
    contrasena: "", // Nuevo campo para contraseña
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<IEditUserErrors>({});
  const [inputBlur, setInputBlur] = useState<Partial<IEditUserProps>>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const pathname = window?.location?.pathname;
    const extractedId = pathname.split("/").pop() || "";
    setId(extractedId);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const usuarioXId = await fetchUserById(id);
          setDataUser({
            nombre: usuarioXId.nombre,
            email: usuarioXId.email,
            image: usuarioXId.image || null,
            edad: usuarioXId.edad,
            telefono: usuarioXId.telefono,
            contrasena: "", // Contraseña vacía inicialmente
          });
        }
      } catch (error) {
        console.error("Error al fetchear usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al cargar los datos del usuario.",
          customClass: {
            confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
          },
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
            }}
        });
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const validationErrors = validateEditUserForm(dataUser);
    setErrors(validationErrors);
  }, [dataUser]);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
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
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", dataUser.nombre);
    formData.append("email", dataUser.email);
    formData.append("edad", String(dataUser.edad));
    formData.append("telefono", String(dataUser.telefono));
    formData.append("contrasena", dataUser.contrasena); // Agregar contraseña al FormData
    if (imageFile) {
      formData.append("imagen", imageFile); // Añadimos la imagen
    }

    setIsSubmitting(true);

    try {
      await updateUser(id, formData);
      Swal.fire({
        title: "Éxito",
        text: `Usuario actualizado correctamente`,
        icon: "success",
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'bg-accent text-white',
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white');
            popup.style.backgroundColor = '#333'; // Fondo oscuro
            popup.style.color = 'white'; // Texto blanco
          }
        },
      })
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al actualizar el usuario",
        icon: "error",
        customClass: {
          confirmButton: 'bg-gray-300 text-white', // Botón de confirmación rojo
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.classList.add('bg-dark', 'text-white'); // Fondo oscuro y texto blanco
          }}
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h2 className={styles.h2}>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="image" className={styles.label}>Imagen</label>
            <input
              id="image"
              name="imagen"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.inputField}
            />
          </div>
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
          <div>
            <label htmlFor="contrasena" className={styles.label}>Coloca tu contraseña para confirmar</label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              value={dataUser.contrasena}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="Contraseña"
              className={styles.inputField}
            />
            {inputBlur.contrasena && errors.contrasena && (
              <span className={styles.errorMessage}>{errors.contrasena}</span>
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
