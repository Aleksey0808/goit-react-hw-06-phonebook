import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = { items: [] };

const contactSlice = createSlice({
  name: 'phone',
  initialState: contactsInitialState,
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearContact(state, action) {
      state.items = [];
    },
  },
});

export const { addContact, deleteContact, clearContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
