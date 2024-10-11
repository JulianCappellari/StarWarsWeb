'use server'
import axios from 'axios';

export const fetchResourceName = async (url: string): Promise<string> => {
    const response = await axios.get(url);
  
    
    if (response.data.title) {
      return response.data.title; 
    }
    
    return response.data.name; 
  };
  
  export const fetchMultipleResourceNames = async (urls: string[]): Promise<string[]> => {
    const names = await Promise.all(urls.map(url => fetchResourceName(url)));
    return names;
  };