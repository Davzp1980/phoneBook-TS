import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Contact = {
  id: string;
  name: string;
  number: string;
};

type NewContact = {
  id?: string;
  name: string;
  number: string;
};
export const fetchContacts = createAsyncThunk<Contact[]>(
  'contacts/fetchAll',
  async function (_, thunkAPI) {
    try {
      const { data } = await axios.get<Contact[]>('/contacts');
      console.log(data);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk<Contact, NewContact>(
  'contacts/addContact',
  async function (contact: NewContact, thunkAPI) {
    try {
      const { data } = await axios.post<Contact>('/contacts', {
        name: contact.name,
        number: contact.number,
      });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk<Pick<Contact, 'id'>, string>(
  'contacts/deleteContact',

  async function (contactId: string, thunkAPI) {
    try {
      const { data } = await axios.delete<Pick<Contact, 'id'>>(
        `/contacts/${contactId}`
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const EditContact = createAsyncThunk<Contact, NewContact>(
  'contacts/editContact',

  async function (contact: NewContact, thunkAPI) {
    try {
      const { data } = await axios.patch<Contact>(`/contacts/${contact.id}`, {
        name: contact.name,
        number: contact.number,
      });

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
