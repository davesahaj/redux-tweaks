import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import movieApi from "../../common/apis/movieApi";
import { apiKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "potter";
    const response = await movieApi.get(
      `?apikey=${apiKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);
export const fetchAsyncSeries = createAsyncThunk(
  "movies/fetchAsyncSeries",
  async () => {
    const seriesText = "office";
    const response = await movieApi.get(
      `?apikey=${apiKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

const initialState = { movies: {}, series: {} };

const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
  },

  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected!");
    },
    [fetchAsyncSeries.fulfilled]: (state, { payload }) => {
      return { ...state, series: payload };
    },
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllSeries = (state) => state.movies.series;
export default movieSlice.reducer;
