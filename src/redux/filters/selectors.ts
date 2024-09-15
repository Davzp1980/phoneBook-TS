import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../contacts/selectors';
import { RootState } from '../store';

import { Contact } from '../contacts/operations';

export const selectError = (state: RootState) => state.contacts.error;

export const selectIsLoading = (state: RootState) => state.contacts.isLoading;

export const selectSearchValue = (state: RootState) => state.filters.name;

export const selectIsModalDelVisible = (state: RootState) =>
  state.filters.isModalDelVisible;

export const selectContactId = (state: RootState) => state.filters.contactId;

export const selectIsModalEditVisible = (state: RootState) =>
  state.filters.isModalEditVisible;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearchValue],
  (contacts: Contact[], searchValue) => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        contact.number.includes(searchValue)
    );
  }
);
