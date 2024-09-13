import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  EditContact,
} from './operations';
import { string } from 'yup';

type Contact = {
  id: string;
  name: string;
  number: string;
};

type InitialState = {
  items: Contact[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  items: [],
  isLoading: false,
  error: null,
};

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.isLoading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(
        fetchContacts.rejected,
        (state, action: PayloadAction<string | null>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.isLoading = false;
          state.error = null;
          state.items.push(action.payload);
        }
      )
      .addCase(addContact.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );

        state.items.splice(index, 1);
      })
      .addCase(
        deleteContact.rejected,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addCase(EditContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        EditContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.items.findIndex(
            contact => contact.id === action.payload.id
          );
          state.items.splice(index, 1);
          state.items.push(action.payload);
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
