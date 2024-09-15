import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../redux/store';

export const LoginForm = () => {
  type InitialValues = {
    email: string;
    password: string;
  };
  const dispatch = useAppDispatch();

  const initialValues: InitialValues = {
    email: '',
    password: '',
  };

  const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('The email must be valid')
      .required('Must be filled in'),
    password: yup
      .string()
      .min(8, 'Password consists minimum of 8 symbols')

      .required('Must be filled in'),
  });

  const handleSubmit = (value: InitialValues, action: any) => {
    dispatch(
      logIn({
        email: value.email,
        password: value.password,
      })
    )
      .unwrap()
      .then(() => {})
      .catch(() => {
        toast.error('login error');
      });

    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Email
            <Field className={css.field} type="email" name="email" />
          </label>
          <ErrorMessage name="email" component="span" />
          <label className={css.label}>
            Password
            <Field className={css.field} type="password" name="password" />
          </label>
          <ErrorMessage name="password" component="span" />
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={Object.keys(errors).length > 0}
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};
