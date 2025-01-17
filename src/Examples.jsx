import React, { useEffect, useState } from 'react';
import {getPopularMovies} from './services/TmbServices.jsx';



const Example = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

/*load PopularMovies es una funcion asincrona que va a llamar a la funcion getPopularMovies de TMBServices.jsx
y te va a dar una lista de pelivulas populares desde la API. Si la solicitud es exitosa se va a actualizarel 
estado de movies con los datos obtenidos.
Y si ocurre algun error(por ejemplo la API no responde ) te lo va a capturar y se actualiza el estado de 
ese error con un mensaje*/

  useEffect(() => {//fectching de la api
    const loadPopularMovies  = async () => {
      try {
        const popularMovies = await getPopularMovies;
        console.log('Películas populares obtenidas:', popularMovies);
        setMovies(popularMovies || []); // Asigna las películas al estado (si no hay resultados, asigna un array vacío)
      } catch (err) {
        console.error('Error al obtener películas populares:', err);
        setError('No se pudieron cargar las películas populares.');// Maneja el error en caso de fallar
      }
    };
  
    loadPopularMovies (); // Llama a la función para obtener las películas cuando el componente se monte
  }, []); //significa que este efecto solo se ejecutará una vez, justo después de que el componente se haya montado.

  /*En la renderizacion, lo primero es mostar un mensaje de que se esta cargando la pelicula mientras 
  espera los datos de la API*/
  return (
    <div>
      <h1>Películas Populares</h1>
      {error && <p>{error}</p>}
      {movies && movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>// Muestra el título de cada película
          ))}
        </ul>
      ) : (
        <p>Cargando películas...</p> // Si no hay películas, muestra el mensaje de carga
      )}
    </div>
  );
};

export default Example;

