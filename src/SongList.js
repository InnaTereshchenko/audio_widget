import React from 'react';
import PropTypes from 'prop-types';

const SongList = ({ songs, chooseCurrentSong }) => {
  const getTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${(sec > 9) ? sec : `0${sec}`}`;
  };

  return (
    <section className="list">
      <ul className="list__list">
        {songs
          ? (
            songs.map((song, i) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li onClick={() => chooseCurrentSong(i)}>
                <div className="list__song">
                  <span>{i + 1}</span>
                  <span>{song.title}</span>
                  <span>{getTime(song.duration)}</span>
                </div>
              </li>
            )))
          : (
            <p>No songs. Search something</p>
          ) }
      </ul>
    </section>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  chooseCurrentSong: PropTypes.func.isRequired,
};

export default SongList;
