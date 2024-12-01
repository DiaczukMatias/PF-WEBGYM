'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Category from '@/components/Categories/Categories'; // Asegúrate de que este componente se encargue de mostrar las categorías
import { getCategories } from '@/helpers/Fetch/FetchCategorias'; // Cambiar por fetchGetSuspendedCategorias() cuando esté listo
import styles from './CategoriasAdmin.module.css'; // Estilos de la vista de categorías
import { ICategoria } from '@/interfaces/ICategory';
import { FetchError } from '@/interfaces/IErrors';

const CategoriasSuspendidasView = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchError | null>(null);
  const { data: session } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session?.user.accessToken) {
          return; // Detener la ejecución
        }
        const fetchedCategorias: ICategoria[] = await getCategories(session?.user.accessToken); // Cambiar por fetchGetSuspendedCategorias()
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
    .filter((categoria) => categoria.nombre)
    .map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      imagen: `/images/categories/${normalizeName(categoria.nombre)}.png`,
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

export default CategoriasSuspendidasView;
