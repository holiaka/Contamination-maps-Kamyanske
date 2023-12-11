import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, editContact } from './operations';

const actionArr = [fetchContacts, addContact, deleteContact, editContact];

const getAction = name => actionArr.map(action => action[name]);

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = [
          ...state.items.filter(item => item.id !== action.payload.id),
        ];
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.items = [
          ...state.items.map(item => 
            (item.id !== action.payload.id) ? item : action.payload
          ),
        ];
      })
      .addMatcher(isAnyOf(...getAction('pending')), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(...getAction('rejected')), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isAnyOf(...getAction('fulfilled')), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const contactReducer = contactSlice.reducer;
