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
      <div className="widget__controls controls">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio src={currentSong.preview} id="music" />
        <button
          type="button"
          className="controls__prev"
          onClick={() => player.play()}
        />
        <button
          type="button"
          className="controls__play"
          onClick={() => player.play()}
        />
        <button
          type="button"
          className="controls__next"
          onClick={() => player.play()}
        />
        <div className="controls__img">
          <img
            src={currentSong.artist.picture}
            className="controls__picture"
            alt=""
          />
          <div className="controls__song">
            <p className="controls__title">{currentSong.title}</p>
            <p className="controls__artist">{currentSong.artist.name}</p>
          </div>
        </div>
        <div className="controls__volume">
          <img
            src="./images/volume.png"
            className="controls__volume-icon"
            alt=""
          />
          <input
            type="range"
            title="volume"
            min="0"
            max="10"
            step="1"
            className="controls__range"
          />
        </div>
      </div>

    </section>
  );
};

SongWidget.propTypes = {
  currentSong: PropTypes.shape().isRequired,
};

export default SongWidget;
