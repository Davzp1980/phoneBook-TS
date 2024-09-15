import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle.tsx';
import { selectIsLoading } from '../../redux/filters/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { useAppDispatch } from '../../redux/store';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts);
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />
      <div>{isLoading && 'Request in progress...'}</div>
      <SearchBox />
      <ContactList />
    </>
  );
}
