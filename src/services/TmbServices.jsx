/*
//archivo será responsable de gestionar las llamadas a la API de TMDb utilizando Axios.
import axios from 'axios';


// Base URL y clave API desde las variables de entorno
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Asegúrate de tener esta variable en tu archivo .env

// Configuración de Axios
const ApiClient = axios.create({
  baseURL: BASE_URL, // Establecer la base URL para todas las peticiones
  params: {
    api_key: API_KEY, // Usar la clave de API desde el entorno
    language: 'es-ES', // Cambiar el idioma según lo desees
  },
});

// Función para obtener películas populares
export const getData = async (direction) => {
  try {
    const response = await ApiClient.get(direction); // Llamar al endpoint de películas populares

    return response.data.results; // Devuelve los resultados de las películas populares
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    throw error; // Propaga el error para manejarlo en otro lugar si es necesario
  }
};

export const getPopularMovies = getData('/movie/popular');
  
*/
/**
 * Obtiene la lista de géneros disponibles.
 * @returns {Promise<Object[]>} - Lista de géneros.
 */
/**
 * Busca contenido por nombre de género.
 * @param {string} genreName - Nombre del género.
 * @returns {Promise<any>} - Resultados filtrados por género.
 */






import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const ApiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
});

const fetchFromApi = async (endpoint, params = {}) => {
  try {
    const response = await ApiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error al realizar la solicitud a ${endpoint}:`, error);
    throw error;
  }
};

export const getGenres = async () => {
  const data = await fetchFromApi('/genre/movie/list');
  return data.genres;
};

export const searchByGenreName = async (genreName) => {
  const genres = await getGenres();
  const genre = genres.find((g) => g.name.toLowerCase() === genreName.toLowerCase());

  if (!genre) {
    console.warn(`Género "${genreName}" no encontrado.`);
    return [];
  }

  const data = await fetchFromApi('/discover/movie', { with_genres: genre.id });
  return data.results;
};

export const searchByTitle = async (query) => {
  const data = await fetchFromApi('/search/multi', { query });
  return data.results;
};

export const searchByPerson = async (personName) => {
  const people = await fetchFromApi('/search/person', { query: personName });
  if (people.results.length > 0) {
    const personId = people.results[0].id;
    const movies = await fetchFromApi('/discover/movie', { with_cast: personId });
    return movies.results;
  }
  return [];
};
