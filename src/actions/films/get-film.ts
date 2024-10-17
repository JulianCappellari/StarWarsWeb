"use server";
import axios from "axios";
import { IFilm } from "@/src/interfaces/IFilm";

export const getFilms = async (title?: string): Promise<IFilm[]> => {
  const urlBack = process.env.CONECCION_BACK;
  const apiUrl = `${urlBack}/api/films`;
  // const apiUrl = 'http://localhost:3001/api/films';

  try {
    const params = title ? { title } : {};

    const response = await axios.get(apiUrl, { params });
    const films = response.data.data;
    // console.log(films);

    return films;
  } catch (error) {
    console.error("Error al obtener las peliculas desde la API:", error);
    throw new Error("Error al obtener las peliculas desde la API");
  }
};
