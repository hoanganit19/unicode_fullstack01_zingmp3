import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerStatus: "pause",
  song: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setPlayerStatus: (state, action) => {
      state.playerStatus = action.payload;
    },
    setSong: (state, action) => {
      state.song = action.payload;
    },
  },
});

export const playerActions = playerSlice.actions;

export const playerReducer = playerSlice.reducer;

export const playerSelector = (state) => state.player;
