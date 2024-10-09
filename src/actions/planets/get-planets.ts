"use server";
import axios from "axios";
import { IPlanet } from "@/src/interfaces/IPlanet";

export const getPlanets = async (name?: string): Promise<IPlanet[]> => {
  // const apiUrl = "http://localhost:3001/api/planets";
  const apiUrl = "https://starwarsapi-xop3.onrender.com/api/planets";

  try {
    const params = name ? { name } : {};

    const response = await axios.get(apiUrl, { params });
    const planets = response.data.data;

    return planets;
  } catch (error) {
    console.error("Error al obtener los planetas desde la API:", error);
    throw new Error("Error al obtener los planetas desde la API");
  }
};
