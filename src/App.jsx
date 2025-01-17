/* import Example from './Examples'
import './App.css'

function App() {
  return (
    <>
      <Example />
    </>
  )
}
 
export default App
*/

import React, { useState } from 'react';
import SearchForm from './components/searcher.jsx';

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <h1>Buscador de Películas</h1>
      <SearchForm onSearch={setResults} />
      <div>
        <h2>Resultados:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                {item.title || item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default App;