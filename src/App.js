import React, { useState, useEffect } from 'react';
import './App.scss';
import SongWidget from './SongWidget';
import SongList from './SongList';

const getSongs = async(search) => {
  const searchValue = search.split(' ').join('-');
  // eslint-disable-next-line max-len
  const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchValue || `eminem`}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': '5762d31ec1msh75e811964ce2558p1eb89fjsn15f47304a68a',
    },
  });

  return response.json();
};

function App() {
  const [songs, setSongs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentSong, setCurrentSong] = useState(
    {
      artist: {},
      album: {},
    }
  );

  useEffect(() => {
    getSongs(searchValue).then(data => setSongs(data.data));
  });

  const chooseCurrentSong = (songIndex) => {
    setCurrentSong(songs.find((song, i) => i === songIndex));
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__title">VISAGE</h1>
        <form className="header__form form">
          <lable>
            Search
            <input
              type="text"
              className="form__input"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </lable>
          <img
            src="./images/search_icon.png"
            alt="search"
            className="form__search-icon"
          />
        </form>
      </header>
      <main className="main">
        <SongWidget
          currentSong={currentSong}
          chooseCurrentSong={chooseCurrentSong}
        />
        <SongList songs={songs} chooseCurrentSong={chooseCurrentSong} />
      </main>
    </div>
  );
}

export default App;
