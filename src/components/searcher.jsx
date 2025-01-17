import React, { useState } from 'react';
import { searchByTitle, searchByGenreName, searchByPerson } from '../services/TmbServices';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('title');
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      let results = [];
      if (filter === 'title') {
        results = await searchByTitle(query);
      } else if (filter === 'genre') {
        results = await searchByGenreName(query);
      } else if (filter === 'person') {
        results = await searchByPerson(query);
      }
      onSearch(results);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <label>
          Filtro:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="title">Título</option>
            <option value="genre">Género</option>
            <option value="person">Reparto/Director</option>
          </select>
        </label>
      </div>

      <input
        type="text"
        placeholder={
          filter === 'title'
            ? 'Buscar por título'
            : filter === 'genre'
            ? 'Buscar por género'
            : 'Buscar por reparto o director'
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;