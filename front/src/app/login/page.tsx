"use client";
import LoginView from "@/views/Login/Login";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Login = () => {
  return (
    <div>
      <SessionProvider>
      <LoginView />

      </SessionProvider>
    </div>
  );
};

export default Login;
