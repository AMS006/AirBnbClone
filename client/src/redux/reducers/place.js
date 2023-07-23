import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  places: [],
  userPlaces: [],
  activePlace: undefined,
  loading: false,
  error: undefined,
};
const deletePlace = (state, id) => {
  const place1 = state.userPlaces.filter((place) => place._id !== id);
  const place2 = state.places.filter((place) => place._id !== id);

  return [place1, place2];
};
const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    placeRequest: (state) => {
      state.loading = true;
    },
    placeGetSuccess: (state, action) => {
      state.loading = false;
      state.places = action.payload.places;
    },
    placeGetByIdSuccess: (state, action) => {
      state.loading = false;
      state.activePlace = action.payload.place;
    },
    placesUserSuccess: (state, action) => {
      state.loading = false;
      state.userPlaces = action.payload.places;
    },
    placeUpdateSuccess: (state, action) => {
      state.loading = false;
      state.userPlaces = state.userPlaces.map((place) => {
        if (place._id === action.payload.place._id) return action.payload.place;
        return place;
      });
    },
    placeAddSuccess: (state, action) => {
      state.loading = false;
      state.userPlaces.push(action.payload.place);
      state.places.push(action.payload.place);
    },
    placeDeleteSuccess: (state, action) => {
      state.loading = false;
      const places = deletePlace(current(state), action.payload);
      console.log(places);
      state.userPlaces = places[0];
      state.places = places[1];
    },
    placeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  placeRequest,
  placeAddSuccess,
  placeGetSuccess,
  placeDeleteSuccess,
  placesUserSuccess,
  placeGetByIdSuccess,
  placeFail,
  placeUpdateSuccess,
} = placeSlice.actions;
export default placeSlice.reducer;
