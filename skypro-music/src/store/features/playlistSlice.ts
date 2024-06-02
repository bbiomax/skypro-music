import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffle: boolean;
  isPlaying: boolean;
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: trackType; tracksData: trackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      // вызывать через dispatch на кнопке следующего трека
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPrevTrack: (state) => {
      // вызывать через dispatch на кнопке предыдущего трека
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state) => {
      // вызывать на кнопке перемешивания
      state.isShuffle = !state.isShuffle;
    },
    setIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setCurrentTrack, setNextTrack, setPrevTrack, setIsShuffle, setIsPlaying } =
  playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
