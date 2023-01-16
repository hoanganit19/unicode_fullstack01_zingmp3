import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useClient from "../../Services/Hooks/useClient";

const initialState = {
  playerStatus: "pause",
  song: {},
  event: null,
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
    setEvent: (state, action) => {
      state.event = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.song = action.payload;
    });
  },
});

export const fetchSongById = createAsyncThunk(
  "player/fetchSongByIdStatus",
  async (songId) => {
    const client = useClient();
    const { data } = await client.get(client.songs + "/" + songId);
    return data;
  }
);

export const playerActions = playerSlice.actions;

export const playerReducer = playerSlice.reducer;

export const playerSelector = (state) => state.player;
