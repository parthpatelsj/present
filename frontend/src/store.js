// store.js
import { createStore } from 'redux';

// Action types
const SELECT_KIRTAN = 'SELECT_KIRTAN';

// Reducer
const kirtanReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_KIRTAN:
      return action.payload;
    default:
      return state;
  }
};

// Action creators
export const selectKirtan = (kirtanData) => ({
  type: SELECT_KIRTAN,
  payload: kirtanData,
});

// Create Redux store
const store = createStore(kirtanReducer);

export default store;
