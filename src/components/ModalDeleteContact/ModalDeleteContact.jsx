import clsx from 'clsx';
import css from './ModalDeleteContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { selectContactId } from '../../redux/filters/selectors';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import { setModalDelVisible } from '../../redux/filters/slice';
function ModalDeleteContact() {
  const dispatch = useDispatch();
  const id = useSelector(selectContactId);

  function handleClickDelete() {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact successfully deleted');
      });
    dispatch(setModalDelVisible(false));
  }
  function handleClickReturn() {
    dispatch(setModalDelVisible(false));
  }

  return (
    <div className={clsx(css.container)}>
      <p className={css.p}>Do you really want to delete a contact? </p>
      <div className={css.btnContainer}>
        <Button
          className={css.buttonDel}
          type="button"
          onClick={handleClickDelete}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <Button
          className={css.buttonRet}
          type="button"
          onClick={handleClickReturn}
          variant="contained"
          color="secondary"
        >
          Return
        </Button>
      </div>
    </div>
  );
}

export default ModalDeleteContact;
