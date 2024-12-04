'use client';

import React, { useEffect, useState } from 'react';
import Category from '@/components/Categories/Categories'; // Asegúrate de que este componente se encargue de mostrar las categorías
import { getCategories } from '@/helpers/Fetch/FetchCategorias'; // Traer los datos del backend
import styles from '@/views/CategoriasAdmin/CategoriasAdmin.module.css'; // Estilos de la vista de categorías
import { ICategoria } from '@/interfaces/ICategory';
import { FetchError } from '@/interfaces/IErrors';
import { useSession } from 'next-auth/react';

const AllCategorias= () => {
  // Estado para las categorías y errores tipados
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchError | null>(null);
  const { data: session } = useSession();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session?.user.accessToken) {
            console.error('El token de acceso no está disponible.');
            return; // Detener la ejecución
          }
        const fetchedCategorias: ICategoria[] = await getCategories(session?.user.accessToken);
        setCategorias(fetchedCategorias);

        if (fetchedCategorias.length === 0) {
          setError({ message: 'No hay categorías existentes' });
        }
      } catch (err) {
        console.error('Error al obtener datos del backend:', err);
        setError({ message: 'Error al cargar las categorías' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const normalizeName = (name: string) =>
    name
      .toLowerCase()
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n');

  const mappedCategorias = categorias
    .filter((categoria) => categoria.nombre) // Filtra categorías sin nombre
    .map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      imagen:  categoria.imagen ||`/images/categories/${normalizeName(categoria.nombre)}.png`,
      estado: categoria.estado ?? true, // Si 'activo' no existe, lo inicializa como 'true'.
    }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className={styles.title}>
        <span className={styles.whiteText}> Nuestras</span>
        <span className={styles.greenText}>Categorías</span>
      </h2>

      {error ? (
        <div className={styles.errorMessage}>{error.message}</div>
      ) : (
        <Category categories={mappedCategorias} />
      )}
    </div>
  );
};

export default AllCategorias;
