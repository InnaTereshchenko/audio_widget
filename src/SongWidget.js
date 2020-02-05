import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import { peaks } from './peaks';

const SongWidget = ({ currentSong, currentSongIndex, chooseCurrentSong }) => {
  const [wave, setWave] = useState(null);
  const getTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${(sec > 9) ? sec : `0${sec}`}`;
  };

  const changeSong = (step) => {
    chooseCurrentSong(currentSongIndex + step);
  };

  useEffect(() => {
    const aud = document.querySelector('#music');
    const wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
      height: 100,
      progressColor: '#4a74a5',
      responsive: true,
      waveColor: '#ccc',
      cursorColor: '#4a74a5',
    });

    setWave(wavesurfer);
    wavesurfer.load(aud, peaks);
  }, []);

  return (
    <section className="widget">
      <div className="widget__visual">
        <img src={currentSong.album.cover} className="widget__picture" alt="" />
        <div className="widget__visualizer">
          <p>{getTime(currentSong.duration)}</p>
          <div id="waveform" className="widget__waveform" />
        </div>
      </div>
      <div className="widget__controls controls">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio src={currentSong.preview} id="music" />
        <button
          type="button"
          className="controls__prev"
          onClick={() => changeSong(-1)}
        />
        <button
          type="button"
          className="controls__play"
          onClick={() => wave.playPause()}
        />
        <button
          type="button"
          className="controls__next"
          onClick={() => changeSong(1)}
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
  currentSongIndex: PropTypes.number.isRequired,
  chooseCurrentSong: PropTypes.func.isRequired,
};

export default SongWidget;
