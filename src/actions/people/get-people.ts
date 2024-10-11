"use server";
import axios from "axios";
import { IPeople } from "@/src/interfaces/IPeople";

export const getPeople = async (name?: string): Promise<IPeople[]> => {
  // const apiUrl = "http://localhost:3001/api/people";
  const urlBack = process.env.CONECCION_BACK;
  const apiUrl = `${urlBack}/api/people`;

  try {
    const params = name ? { name } : {};

    const response = await axios.get(apiUrl, { params });
    const people = response.data.data;

    return people;
  } catch (error) {
    console.error("Error al obtener los personajes desde la API:", error);
    throw new Error("Error al obtener los personajes desde la API");
  }
};
