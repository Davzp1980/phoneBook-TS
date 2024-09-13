import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../contacts/selectors';
import { RootState } from '@reduxjs/toolkit/query';

export const selectError = (state: RootState) => state.contacts.error;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectSearchValue = state => state.filters.name;

export const selectIsModalDelVisible = state => state.filters.isModalDelVisible;

export const selectContactId = state => state.filters.contactId;

export const selectIsModalEditVisible = state =>
  state.filters.isModalEditVisible;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearchValue],
  (contacts, searchValue) => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) |
        contact.number.includes(searchValue)
    );
  }
);
