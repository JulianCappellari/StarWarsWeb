'use server'
import axios from 'axios';
// Función genérica para obtener el nombre del recurso desde la URL
export const fetchResourceName = async (url: string): Promise<string> => {
    const response = await axios.get(url);
  
    // Verificar si la URL es de una película y devolver el título
    if (response.data.title) {
      return response.data.title; // Títulos de películas
    }
    
    return response.data.name; // Asumiendo que la respuesta tiene un campo 'name' para otros recursos
  };
  
  export const fetchMultipleResourceNames = async (urls: string[]): Promise<string[]> => {
    const names = await Promise.all(urls.map(url => fetchResourceName(url)));
    return names;
  };