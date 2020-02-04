import React from 'react';
import PropTypes from 'prop-types';

const SongWidget = ({ currentSong }) => {
  const player = document.getElementById('music');

  return (
    <section className="widget">
      <div className="widget__visual">
        <img src={currentSong.album.cover} className="widget__picture" alt="" />
        <div className="widget__visualizer">
          <p>{currentSong.duration}</p>
        </div>
      </div>
      <div className="widget__controls">
        <p>{currentSong.title}</p>
        <p>{currentSong.artist.name}</p>
        <button type="button" onClick={() => player.play()}>Prev</button>
        <button type="button" onClick={() => player.play()}>Play</button>
        <button type="button" onClick={() => player.play()}>Next</button>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio src={currentSong.preview} id="music" />
      </div>

    </section>
  );
};

SongWidget.propTypes = {
  currentSong: PropTypes.shape().isRequired,
};

export default SongWidget;
