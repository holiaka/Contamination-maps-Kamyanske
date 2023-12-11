import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,

  reducers: {
    searchKeyword(_, action) {
      return action.payload;
    },
  },
});

export const { searchKeyword } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
