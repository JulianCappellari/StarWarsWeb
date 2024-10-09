"use server";
import axios from "axios";
import { IStarship } from "@/src/interfaces/IStarship";

export const getStarship = async (name?: string): Promise<IStarship[]> => {
  // const apiUrl = "http://localhost:3001/api/starships";
  const apiUrl = "https://starwarsapi-xop3.onrender.com/api/starships";

  try {
    const params = name ? { name } : {};

    const response = await axios.get(apiUrl, { params });
    const starships = response.data.data;

    return starships;
  } catch (error) {
    console.error("Error al obtener las naves desde la API:", error);
    throw new Error("Error al obtener las naves desde la API");
  }
};
