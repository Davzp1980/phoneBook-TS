import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import css from './ContactForm.module.css';
import * as yup from 'yup';
import { ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import { addContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../redux/store';

export function ContactForm() {
  const contactNameFieldId = useId();
  const phoneNumberFieldId = useId();

  type InitialValues = {
    contactName: string;
    phoneNumber: string;
  };

  const initialValues: InitialValues = {
    contactName: '',
    phoneNumber: '',
  };

  const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
  const ValidationSchema = yup.object().shape({
    contactName: yup
      .string()
      .min(3, 'Too short name')
      .max(50, 'Too long name')
      .required('Must be filled in'),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, 'number format: xxx-xxx-xx-xx')
      .min(13, 'Phone number consists of 9 digits')
      .max(13, 'Phone number consists of 9 digits')
      .required('Must be filled in'),
  });

  const dispatch = useAppDispatch();

  function handleSubmit(values: InitialValues, actions: any) {
    dispatch(
      addContact({
        name: values.contactName,
        number: values.phoneNumber,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Contact successfully created');
      });

    actions.resetForm();
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <label htmlFor={contactNameFieldId}>Name</label>

          <Field
            className={css.field}
            type="text"
            name="contactName"
            id={contactNameFieldId}
          />

          <ErrorMessage name="contactName" component="span" />
          <label htmlFor={phoneNumberFieldId}>Number</label>
          <Field
            className={css.field}
            type="text"
            name="phoneNumber"
            id={phoneNumberFieldId}
            placeholder="098-999-99-99"
          />
          <ErrorMessage name="phoneNumber" component="span" />
          <Button
            className={css.button}
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length > 0}
          >
            Add contact
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;
