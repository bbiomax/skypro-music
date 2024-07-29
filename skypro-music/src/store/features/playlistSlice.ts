import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    searchValue: string;
    genre: string[];
    order: string;
  };
  filteredTracks: trackType[];
  initialTracks: trackType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
  filterOptions: {
    author: [],
    searchValue: "",
    genre: [],
    order: "По умолчанию",
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: trackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },

    toggleIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

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
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },

    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        searchValue?: string;
        genre?: string[];
        order?: string;
      }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
      };

      const arrFilters = state.initialTracks.filter((track) => {
        const hasAuthors = state.filterOptions.author.length !== 0;
        const hasGenre = state.filterOptions.genre.length !== 0;
        const isGenre = hasGenre
          ? state.filterOptions.genre.includes(track.genre)
          : true;

        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(track.author)
          : true;

        const hasSearchValue = track.name
          .toLowerCase()
          .includes(state.filterOptions.searchValue?.toLowerCase());

        return isAuthors && hasSearchValue && isGenre;
      });

      switch (state.filterOptions.order) {
        case "Сначала новые":
          arrFilters.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        case "Сначала старые":
          arrFilters.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );
          break;

        default:
          break;
      }
      state.filteredTracks = arrFilters;
    },
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setIsShuffle,
  setPrevTrack,
  toggleShuffle,
  toggleIsPlaying,
  setFilters,
  setInitialTracks,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
