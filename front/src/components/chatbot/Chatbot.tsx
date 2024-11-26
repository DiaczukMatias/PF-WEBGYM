// src/components/Chatbot.tsx
"use client"; // Marca este componente como cliente

import { useEffect } from "react";

interface LandbotLivechatInstance {
  destroy: () => void; // Ejemplo: si hay un método destroy en la instancia
}

interface Landbot {
  Livechat: new (options: { configUrl: string }) => LandbotLivechatInstance;
}

declare global {
  interface Window {
    myLandbot?: LandbotLivechatInstance; // Cambiado para usar un tipo definido
    Landbot: Landbot;
  }
}

const Chatbot: React.FC = () => {
  useEffect(() => {
    const initLandbot = () => {
      if (!window.myLandbot) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.addEventListener("load", function () {
          window.myLandbot = new window.Landbot.Livechat({
            configUrl:
              "https://storage.googleapis.com/landbot.online/v3/H-2686288-MPBDES1YW46RP2RX/index.json",
          });
        });
        s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
        const x = document.getElementsByTagName("script")[0];
        x.parentNode?.insertBefore(s, x);
      }
    };

    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return null;
};

export default Chatbot;
