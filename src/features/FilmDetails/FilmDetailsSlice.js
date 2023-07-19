import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../requester";

const initialState = {
  currentFilm: {},
  isLoading: false,
  awards: [],
};

export const getFilmDetails = createAsyncThunk("FilmDetails", async (id) => {
  console.log("id: ", id);
  const response = await API.get(id);
  return response.data;
});

export const getFilmFacts = createAsyncThunk("FilmFacts", async (id) => {
  console.log("id: ", id);
  const response = await API.get(id + "/facts");
  return response.data;
});

export const getFilmAwards = createAsyncThunk("FilmAwards", async (id) => {
  console.log("id: ", id);
  const response = await API.get(id + "/awards");
  return response.data;
});

export const getFilmVideos = createAsyncThunk("FilmVideos", async (id) => {
  console.log("id: ", id);
  const response = await API.get(id + "/videos");
  return response.data;
});

const filmDetailsSlice = createSlice({
  name: "filmDetails",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getFilmDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilmDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentFilm = action.payload;
    });
    builder.addCase(getFilmFacts.fulfilled, (state, action) => {
      state.facts = action.payload;
    });
    builder.addCase(getFilmAwards.fulfilled, (state, action) => {
      state.awards = action.payload.items;
    });
    builder.addCase(getFilmVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
  },
});

export default filmDetailsSlice.reducer;
