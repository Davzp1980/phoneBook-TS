import * as yup from 'yup';
import css from './ModalEditContact.module.css';

import { EditContact } from '../../redux/contacts/operations';
import { selectContactId } from '../../redux/filters/selectors';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { setModalEditVisible } from '../../redux/filters/slice';
import { selectContacts } from '../../redux/contacts/selectors';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../redux/store';

function ModalEditContact() {
  type InitialValues = {
    id?: string;
    name: string;
    number: string;
  };
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectContactId);
  const contacts = useAppSelector(selectContacts);

  const contact = contacts.find(contact => contact.id === id);

  if (!contact) return null;
  const contactNameEdit = contact.name;
  const contactNumberEdit = contact.number;

  function handleEdit(values: InitialValues, actions: any) {
    dispatch(setModalEditVisible(false));

    dispatch(
      EditContact({
        id,
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Contact successfully edited');
      });
    actions.resetForm();
  }
  const initialValues: InitialValues = {
    name: contactNameEdit,
    number: contactNumberEdit,
  };
  const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
  const ValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Too short name')
      .max(50, 'Too long name')
      .required('Must be filled in'),
    number: yup
      .string()
      .matches(phoneRegExp, 'number format: xxx-xxx-xx-xx')
      .min(13, 'Phone number consists of 9 digits')
      .max(13, 'Phone number consists of 9 digits')
      .required('Must be filled in'),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleEdit}
        validationSchema={ValidationSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field className={css.input} type="text" name="name" />
            <ErrorMessage name="name" component="span" />
          </label>

          <label className={css.label}>
            Phone number
            <Field className={css.input} type="text" name="number" />
            <ErrorMessage name="number" component="span" />
          </label>
          <div className={css.btnContainer}>
            <Button
              className={css.button}
              type="submit"
              variant="contained"
              color="success"
            >
              Edit
            </Button>
            <Button
              onClick={() => dispatch(setModalEditVisible(false))}
              className={css.button}
              type="button"
              variant="contained"
              color="secondary"
            >
              Return
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default ModalEditContact;
