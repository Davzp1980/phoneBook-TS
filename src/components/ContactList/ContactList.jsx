/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/filters/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';

export function ContactList() {
  const sortedContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.ul}>
      {sortedContacts.length === 0 && <p>Contact list is empty</p>}
      {Array.isArray(sortedContacts) &&
        sortedContacts.map(contact => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
    </ul>
  );
}

export default ContactList;
