"use client";
import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import styles from "./AboutUs.module.css";
import locationIcon from "./location-icon.png";
import Image from "next/image";

export default function AboutUs() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const marker = useRef<maptilersdk.Marker | null>(null);

  const comercio = { lng: -58.4438, lat: -34.6037 };
  const zoom: number = 15;

  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

  maptilersdk.config.apiKey = apiKey || "";

  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [comercio.lng, comercio.lat],
        zoom: zoom,
        dragPan: true,
        scrollZoom: true,
        boxZoom: true,
        doubleClickZoom: true,
        maxBounds: [
          [-58.6, -34.7],
          [-58.3, -34.5],
        ],
      });

      map.current.on("load", () => {
        console.log("Mapa cargado");

        if (map.current && !marker.current) {
          marker.current = new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([comercio.lng, comercio.lat])
            .addTo(map.current);
          console.log("Marcador añadido al mapa");

          map.current.flyTo({
            center: [comercio.lng, comercio.lat],
            zoom: zoom,
            essential: true,
          });
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [comercio.lng, comercio.lat, zoom]);

  return (
    <div>
      <h1 className={styles.h1}>
        <span className={styles.whiteText}>SOBRE</span>
        <span className={styles.greenText}>NOSOTROS</span>
      </h1>

      <p className={styles.description}>
        En ForgeFit, nuestra misión es promover un estilo de vida saludable y
        activo para todos. Contamos con un equipo de entrenadores altamente
        capacitados que están dedicados a guiarte en tu camino hacia el
        bienestar. Ofrecemos una variedad de clases y entrenamientos
        personalizados adaptados a tus necesidades y objetivos, todo en un
        ambiente inclusivo y motivador. Únete a nuestra comunidad y descubre
        cómo puedes alcanzar tu mejor versión.
      </p>

      <h2 className={styles.h2}>
        <Image src="/location-icon.png" alt="Location" width={35} height={10} />
        CABALLITO
      </h2>

      {/* Mapa */}
      <div className={styles.mapWrap}>
        <div ref={mapContainer} className={styles.map} />
      </div>
    </div>
  );
}
