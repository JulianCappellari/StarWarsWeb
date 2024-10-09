'use server';
import axios from 'axios';
import { IFilm } from '@/src/interfaces/IFilm'; 


export const getFilmsById = async (id:number): Promise<IFilm[]> => {
  const apiUrl = `https://swapi.dev/api/films/${id}`; 

  try {
    

    
    const response = await axios.get(apiUrl);
    const film = response.data.data; 

    return film; 
  } catch (error) {
    console.error('Error fetching film  from API:', error);
    throw new Error('Error fetching film from API');
  }
};