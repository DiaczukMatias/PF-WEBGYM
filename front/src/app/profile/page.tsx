"use client"
import ProfileProfesor from "@/views/ProflleProfesor/ProfileProfesor";
import React from "react";
import { useSession} from "next-auth/react";
import ProfileUsers from "@/views/ProfileUsers/ProfileUsers";
import ProfileAdmin from "@/views/ProfileAdmin/ProfileAdmin";

const Profile :React.FC = () => {

  const { data: session } = useSession();
  const rolUsuario = session?.user?.rol;
console.log("rol usuario session-user.rol:", rolUsuario)

  const esCliente = rolUsuario === "cliente" ;
  const esAdmin = rolUsuario === "admin";
  const esProfesor = rolUsuario === "profesor";

  return (
    <div>
       {(esCliente) && (
          <ProfileUsers />        )}
      {(esProfesor) && (
      <ProfileProfesor />)}
      {(esAdmin) && (
      <ProfileAdmin />)}
    </div>
  );
};

export default Profile;
