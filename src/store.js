import { createStore } from 'redux';

// Action Types
const ACTION_TYPE_SET_SONGS = 'SET_SONGS';
const ACTION_TYPE_SET_CURRENT_SONG = 'SET_CURRENT_SONG';
const ACTION_TYPE_SET_CURRENT_SONG_INDEX = 'SET_CURRENT_SONG_INDEX';

const ACTION_TYPE_START_SEARCHING = 'START_SEARCHING';
const ACTION_TYPE_FINISH_SEARCHING = 'FINISH_SEARCHING';

// Action Creators
export const setSongs = songs => ({
  type: ACTION_TYPE_SET_SONGS,
  songs,
});

export const setCurrentSong = currentSongIndex => ({
  type: ACTION_TYPE_SET_CURRENT_SONG,
  currentSongIndex,
});

export const setCurrentSongIndex = currentSongIndex => ({
  type: ACTION_TYPE_SET_CURRENT_SONG_INDEX,
  currentSongIndex,
});

export const startSearching = () => ({
  type: ACTION_TYPE_START_SEARCHING,
});

export const finishSearching = () => ({
  type: ACTION_TYPE_FINISH_SEARCHING,
});

// Selectors
export const getSongs = state => state.songs;
export const getCurrentSong = state => state.currentSong;
export const getCurrentSongIndex = state => state.currentSongIndex;
export const getSearchingStatus = state => state.isSearching;

// Reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_SONGS:
      return {
        ...state,
        songs: action.songs,
      };
    case ACTION_TYPE_SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: state.songs
          .find((song, i) => i === action.currentSongIndex),
      };
    case ACTION_TYPE_SET_CURRENT_SONG_INDEX:
      return {
        ...state,
        currentSongIndex: action.currentSongIndex,
      };
    case ACTION_TYPE_START_SEARCHING:
      return {
        ...state,
        isSearching: true,
      };
    case ACTION_TYPE_FINISH_SEARCHING:
      return {
        ...state,
        isSearching: false,
      };
    default:
      return state;
  }
};

const initialState = {
  songs: null,
  isSearching: false,
  currentSongIndex: -1,
  currentSong: {
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
  },
};

const store = createStore(rootReducer, initialState);

export default store;
