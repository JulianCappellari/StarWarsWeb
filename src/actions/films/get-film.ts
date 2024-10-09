
'use server';
import axios from 'axios';
import { IFilm } from '@/src/interfaces/IFilm';


export const getFilms = async (title?: string): Promise<IFilm[]> => {
  // const apiUrl = 'http://localhost:3001/api/films'; 
  const apiUrl = 'https://starwarsapi-xop3.onrender.com/api/films'; 

  try {
    
    const params = title ? { title } : {};

    
    const response = await axios.get(apiUrl, { params });
    const films = response.data.films; 

    return films; 
  } catch (error) {
    console.error('Error al obtener las peliculas desde la API:', error);
    throw new Error('Error al obtener las peliculas desde la API');
  }
};
