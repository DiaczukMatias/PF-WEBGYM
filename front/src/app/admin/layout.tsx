"use client"

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const sidebarItems = [
  {
    label: "Usuarios",
    path: "/admin/usuarios",
    subItems: [
      {
        label: "Usuarios Activos",
        path: "/admin/usuarios/activos",
        subItems: [
          { label: "Rol Cliente", path: "/admin/usuarios/activos/cliente" },
          { label: "Rol Profesor", path: "/admin/usuarios/activos/profesor" },
          { label: "Rol Admin", path: "/admin/usuarios/activos/admin" },
        ],
      },
        { label: "Usuarios Suspendidos", path: "/admin/usuarios/suspendidos" },
    ],
  },
  {
    label: "Clases",
    path: "/admin/clases",
    subItems: [
      { label: "Clases Activas", path: "/admin/clases/activas" },
      { label: "Clases Suspendidas", path: "/admin/clases/suspendidas" },
      { label: "Crear Clase", path: "/admin/clases/crear" },
    ],
  },
  {
    label: "Categorías",
    path: "/admin/categorias",
    subItems: [
      { label: "Categorías Activas", path: "/admin/categorias/activas" },
    //  { label: "Categorías Suspendidas", path: "/admin/categorias/suspendidas" },
      { label: "Crear Categoría", path: "/admin/categorias/crear" },
    ],
  },
  {
    label: "Planes",
    path: "/admin/planes",
    subItems: [
      { label: "Planes Disponibles", path: "/admin/planes/disponibles" },
     // { label: "Usuarios Miembros", path: "/admin/planes/miembros" },
      { label: "Crear Nuevo Plan", path: "/admin/planes/crear" },
      { label: "Planes Suspendidos", path: "/admin/planes/suspendidos" },

    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // Estado para submenús
  const pathname = usePathname();
  const router = useRouter(); // Router para redireccionar

  // Función para manejar la expansión de submenús
  const handleMainItemClick = (item: { label: string; path: string }) => {
    if (expandedItems.includes(item.label)) {
      setExpandedItems(expandedItems.filter((label) => label !== item.label));
    } else {
      setExpandedItems([...expandedItems, item.label]);
    }

    // Navega al principal si no está ya en esa ruta
    if (pathname !== item.path) {
      router.push(item.path);
    }
  };

  // Función para manejar la expansión de subsubmenús (roles)
  const handleSubItemClick = (path: string) => {
    router.push(path); // Navegar a la ruta seleccionada
  };

  return (
    <div className="flex h-screen text-lg text-white">
      {/* Sidebar */}
      <aside
        className={`bg-slate-800 text-accent transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full p-4 hover:bg-accent focus:outline-none"
        >
          <span className="material-icons">menu</span>
        </button>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {/* Elemento principal */}
              <button
                className={`flex items-center text-white w-full p-4 hover:bg-accent hover:text-black ${
                  pathname === item.path ? "bg-accent text-black" : ""
                }`}
                onClick={() => handleMainItemClick(item)} // Manejo de expansión de submenús
              >
                <span>{isExpanded && item.label}</span>
              </button>

              {/* Submenús */}
              {expandedItems.includes(item.label) && isExpanded && item.subItems && (
                <div className="pl-8">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.path}>
                      <button
                        className={`block text-white w-full p-2 hover:bg-accent hover:text-black ${
                          pathname === subItem.path ? "bg-accent text-black" : ""
                        }`}
                        onClick={() => router.push(subItem.path)} // Navegar al submenú
                      >
                        {subItem.label}
                      </button>

                      {/* Subsubmenús (roles) */}
                      {subItem.subItems && (
                        <div className="pl-8">
                          {subItem.subItems.map((nestedItem) => (
                            <button
                              key={nestedItem.path}
                              onClick={() => handleSubItemClick(nestedItem.path)} // Expande/cierra el subsubmenú
                              className={`block text-white w-full p-2 hover:bg-accent hover:text-black ${
                                pathname === nestedItem.path ? "bg-accent text-black" : ""
                              }`}
                            >
                              {nestedItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
