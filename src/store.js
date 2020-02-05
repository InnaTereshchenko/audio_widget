import { createStore } from 'redux';

// Action Types
const ACTION_TYPE_SET_SONGS = 'SET_SONGS';

// Action Creators
export const setPosts = songs => ({
  type: ACTION_TYPE_SET_SONGS,
  songs,
});

// Selectors

// Reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_SONGS:
      return {
        ...state,
        songs: action.songs,
      };
    default:
      return state;
  }
};

const initialState = {
  songs: [],
  currentSong: {},
};

const store = createStore(rootReducer, initialState);

export default store;
