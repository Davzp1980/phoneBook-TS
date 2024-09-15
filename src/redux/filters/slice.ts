import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterInitialState = {
  name: string;
  isModalDelVisible: boolean;
  isModalEditVisible: boolean;
  contactId: string;
};
const initialState: FilterInitialState = {
  name: '',
  isModalDelVisible: false,
  isModalEditVisible: false,
  contactId: '',
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setModalDelVisible(state, action: PayloadAction<boolean>) {
      state.isModalDelVisible = action.payload;
    },
    setContactId(state, action: PayloadAction<string>) {
      state.contactId = action.payload;
    },
    setModalEditVisible(state, action: PayloadAction<boolean>) {
      state.isModalEditVisible = action.payload;
    },
  },
});

export const {
  changeFilter,
  setModalDelVisible,
  setModalEditVisible,
  setContactId,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
