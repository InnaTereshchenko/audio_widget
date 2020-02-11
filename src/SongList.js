import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-duplicates
import * as selectors from './store';
// eslint-disable-next-line import/no-duplicates
import * as actionCreators from './store';

const SongList = ({
  songs,
  currentSong,
  setCurrentSong,
  searchingStatus,
  setCurrentSongIndex,
}) => {
  const getTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${(sec > 9) ? sec : `0${sec}`}`;
  };

  const handleSongClick = (index) => {
    setCurrentSong(index);
    setCurrentSongIndex(index);
  };

  return (
    <section className="list">
      <ul className="list__list">
        {searchingStatus ? <p className="list__searching">Searching...</p> : ''}
        {songs
          ? (
            songs.map((song, i) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li onClick={() => handleSongClick(i)}>
                <div className={currentSong.id === song.id
                  ? 'list__song active'
                  : 'list__song'}
                >
                  <span>{i + 1}</span>
                  <span>{song.title}</span>
                  <span>{getTime(song.duration)}</span>
                </div>
              </li>
            )))
          : (
            <p className="list__text">
              Explore new music. Search for something
            </p>
          ) }
      </ul>
    </section>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSong: PropTypes.shape().isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  searchingStatus: PropTypes.bool.isRequired,
  setCurrentSongIndex: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  songs: selectors.getSongs(state),
  currentSong: selectors.getCurrentSong(state),
  searchingStatus: selectors.getSearchingStatus(state),
});

const mapDispatchToProps = {
  setCurrentSong: actionCreators.setCurrentSong,
  setCurrentSongIndex: actionCreators.setCurrentSongIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
