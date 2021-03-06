import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import { peaks } from './peaks';
// eslint-disable-next-line import/no-duplicates
import * as selectors from './store';
// eslint-disable-next-line import/no-duplicates
import * as actionCreators from './store';

const secondsToTimestamp = (seconds) => {
  const sec = Math.floor(seconds);
  let h = Math.floor(sec / 3600);
  let m = Math.floor((sec - (h * 3600)) / 60);
  let s = sec - (h * 3600) - (m * 60);

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  return `${m}:${s}`;
};

const SongWidget = ({
  currentSong,
  currentSongIndex,
  setCurrentSongIndex,
  setCurrentSong,
  playSong,
  pauseSong,
  playingStatus,
}) => {
  const [wave, setWave] = useState(null);
  const [currentTime, setCurrentTime] = useState('00:00');
  const getTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${(sec > 9) ? sec : `0${sec}`}`;
  };

  const changeSong = (step) => {
    if (
      (step === -1 && currentSongIndex !== 0 && currentSongIndex !== -1)
      || (step === 1 && currentSongIndex !== 24 && currentSongIndex !== -1)
    ) {
      setCurrentSong(currentSongIndex + step);
      setCurrentSongIndex(currentSongIndex + step);
    }
  };

  useEffect(() => {
    const aud = document.querySelector('#music');
    const wavesurfer = WaveSurfer.create({
      barWidth: 3,
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

  const playPause = () => {
    playingStatus ? pauseSong() : playSong();
    wave.playPause();
    wave.on('audioprocess', updateTimer);
  };

  const updateTimer = () => {
    const formattedTime = wave.getCurrentTime();

    const time = secondsToTimestamp(formattedTime);

    setCurrentTime(time);
  };

  return (
    <section className="widget">
      <div className="widget__visual">
        <img src={currentSong.album.cover} className="widget__picture" alt="" />
        <div className="widget__visualizer">
          <p className="widget__current-time">{currentTime}</p>
          <p className="widget__all-time">{getTime(currentSong.duration)}</p>
          <div id="waveform" className="widget__waveform" />
        </div>
      </div>
      <div className="widget__controls controls">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio src={currentSong.preview} id="music" />
        <div className="controls__buttons">
          <button
            type="button"
            className="controls__prev"
            onClick={() => changeSong(-1)}
          />
          <button
            type="button"
            className={playingStatus
              ? 'controls__play playing'
              : 'controls__play'}
            onClick={playPause}
          />
          <button
            type="button"
            className="controls__next"
            onClick={() => changeSong(1)}
          />
        </div>
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
            max="1"
            step="0.1"
            className="controls__range"
            onChange={e => wave.setVolume(e.target.value)}
          />
        </div>
      </div>

    </section>
  );
};

SongWidget.propTypes = {
  currentSong: PropTypes.shape().isRequired,
  currentSongIndex: PropTypes.number.isRequired,
  setCurrentSongIndex: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  pauseSong: PropTypes.func.isRequired,
  playingStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentSong: selectors.getCurrentSong(state),
  currentSongIndex: selectors.getCurrentSongIndex(state),
  playingStatus: selectors.getPlayingStatus(state),
});

const mapDispatchToProps = {
  setCurrentSong: actionCreators.setCurrentSong,
  setCurrentSongIndex: actionCreators.setCurrentSongIndex,
  playSong: actionCreators.playSong,
  pauseSong: actionCreators.pauseSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongWidget);
