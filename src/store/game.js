import { createSlice } from '@reduxjs/toolkit';
import generateDuplicateArrayPair from '../utils/generateData';
import config from '../config';

const { NUM_PAIRS } = config;

// Redux Toolkit uses Immer to provide immutability under the hook, even though it looks like mutable assignments
const slice = createSlice({
  name: 'game',
  initialState: {
    moveCount: 0,
    totalSteps: 0,
    data: [],
    won: false,
    error: null,
  },
  reducers: {
    gameStarted: (game, action) => {
      game.moveCount = 0;
      game.totalSteps = 0;
      game.data = action.payload;
      game.won = false;
    },
    itemSelected: (game, action) => {
      game.data = game.data.map((item) => (item.id === action.payload ? { ...item, selected: true } : item));
      game.moveCount++;
      game.totalSteps++;
    },
    itemMatched: (game, action) => {
      game.data = game.data.map((item) => (item.value === action.payload ? { ...item, selected: false, matched: true } : { ...item, selected: false }));
      game.totalSteps++;
      game.moveCount = 0;
      if (game.data.every((item) => item.matched)) game.won = true;
    },
    itemNotMatched: (game) => {
      game.moveCount = 0;
      game.totalSteps++;
      game.data = game.data.map((item) => ({ ...item, selected: false }));
    },
    errorSet: (game) => {
      game.error = true;
    },
  },
});

const { itemMatched, itemSelected, itemNotMatched, gameStarted, errorSet } = slice.actions;
export default slice.reducer;

export const selectItem = (item) => (dispatch, getState) => {
  const { moveCount, data } = getState().game;
  const currentSelected = data.find((item) => item.selected);

  if (currentSelected && currentSelected.id === item.id) return;
  if (moveCount === 0) return dispatch(itemSelected(item.id));
  if (currentSelected && currentSelected.value === item.value) return dispatch(itemMatched(item.value));
  return dispatch(itemNotMatched());
};

export const startGame = () => (dispatch) => {
  if (!isValidConfig()) return dispatch(errorSet());

  const data = generateDuplicateArrayPair(NUM_PAIRS);
  return dispatch(gameStarted(data));
};

const isValidConfig = () => Number.isInteger(NUM_PAIRS) && NUM_PAIRS >= 1 && NUM_PAIRS <= 100;
