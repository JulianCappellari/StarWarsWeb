"use server";
import axios from "axios";
import { IPeople } from "@/src/interfaces/IPeople";

export const getPeopleById = async (id: number): Promise<IPeople[]> => {
  const apiUrl = `https://swapi.dev/api/people/${id}`;

  try {
    const response = await axios.get(apiUrl);
    const people = response.data.data;

    return people;
  } catch (error) {
    console.error("Error al obtener los personajes desde la API:", error);
    throw new Error("Error al obtener los personajes desde la API");
  }
};
