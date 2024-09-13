/* eslint-disable react/prop-types */
import css from './Contact.module.css';
import { FaUserLarge } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import {
  setContactId,
  setModalDelVisible,
  setModalEditVisible,
} from '../../redux/filters/slice';
import { Button } from '@mui/material';

function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  function handleClickDelete() {
    dispatch(setContactId(id));
    dispatch(setModalDelVisible(true));
  }

  function handleClickEdit() {
    dispatch(setContactId(id));
    dispatch(setModalEditVisible(true));
  }

  return (
    <div className={css.container}>
      <div className={css.info}>
        <p className={css.pUser}>
          <FaUserLarge className={css.iconUser} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={css.iconPhone} /> {number}
        </p>
      </div>
      <div className={css.btnContainer}>
        <Button
          className={css.btn}
          type="button"
          onClick={handleClickDelete}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <Button
          className={css.btn}
          type="button"
          onClick={handleClickEdit}
          variant="contained"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export default Contact;
