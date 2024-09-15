import { RootState } from '../store';

export const selectContacts = (state: RootState) => state.contacts.items;
