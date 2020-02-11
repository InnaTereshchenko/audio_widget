import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.scss';
import SongWidget from './SongWidget';
import SongList from './SongList';
import * as actionCreators from './store';

const getSongs = async(search) => {
  const searchValue = search.split(' ').join('-');
  // eslint-disable-next-line max-len
  const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchValue}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': '5762d31ec1msh75e811964ce2558p1eb89fjsn15f47304a68a',
    },
  });

  return response.json();
};

const debounce = (f, delay) => {
  let timerId = 0;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

function App({ setSongs, startSearching, finishSearching }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValue = (e) => {
    startSearching();
    setSearchValue(e.target.value);
    planSearch(e.target.value);
  };

  const search = (value) => {
    getSongs(value).then(data => setSongs(data.data));
    finishSearching();
  };

  const planSearch = useCallback(
    debounce(search, 700), []
  );

  return (
    <div>
      <header className="header">
        <h1 className="header__title">VISAGE</h1>
        <form className="header__form form">
          <input
            placeholder="Search"
            type="text"
            className="form__input"
            value={searchValue}
            onChange={handleSearchValue}
          />
          <img
            src="./images/search_icon.png"
            alt="search"
            className="form__search-icon"
          />
        </form>
      </header>
      <main className="main">
        <SongWidget />
        <SongList />
      </main>
    </div>
  );
}

const mapDispatchToProps = {
  setSongs: actionCreators.setSongs,
  startSearching: actionCreators.startSearching,
  finishSearching: actionCreators.finishSearching,
};

App.propTypes = {
  setSongs: PropTypes.func.isRequired,
  startSearching: PropTypes.func.isRequired,
  finishSearching: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
