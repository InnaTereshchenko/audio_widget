import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import SongWidget from './SongWidget';
import SongList from './SongList';

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

function App() {
  const [songs, setSongs] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentSong, setCurrentSong] = useState(
    {
      title: 'Nocturne in E Flat Major, Op. 9, No. 2',
      // eslint-disable-next-line max-len
      preview: 'https://cdns-preview-a.dzcdn.net/stream/c-a09a10972a4b3421a8374824e4540287-2.mp3',
      duration: 284,
      artist: {
        name: 'Frédéric Chopin',
        picture: 'https://api.deezer.com/artist/8473/image',
      },
      album: {
        cover: 'https://api.deezer.com/album/7553472/image',
      },
    }
  );
  const [isSearching, setIsSearching] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  const handleSearchValue = (e) => {
    setIsSearching(true);
    setSearchValue(e.target.value);
    planSearch(e.target.value);
  };

  const search = (value) => {
    getSongs(value).then(data => setSongs(data.data));
    setIsSearching(false);
  };

  const planSearch = useCallback(
    debounce(search, 700), []
  );

  const chooseCurrentSong = (songIndex) => {
    setCurrentSong(songs.find((song, i) => i === songIndex));
    setCurrentSongIndex(songIndex);
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
              onChange={handleSearchValue}
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
          currentSongIndex={currentSongIndex}
        />
        <SongList
          songs={songs}
          chooseCurrentSong={chooseCurrentSong}
          isSearching={isSearching}
        />
      </main>
    </div>
  );
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
