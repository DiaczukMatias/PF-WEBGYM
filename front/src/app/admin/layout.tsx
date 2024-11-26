"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { label: "Usuarios", path: "/admin/usuarios" },
  { label: "Clases", path: "/admin/clases" },
  { label: "Categorías", path: "/admin/categorias" },
  { label: "Planes", path: "/admin/planes" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen text-lg  text-white">
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
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center text-white w-full p-4 hover:bg-accent hover:text-black ${
                pathname === item.path ? "bg-accent text-black" : ""
              }`}
            >
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
