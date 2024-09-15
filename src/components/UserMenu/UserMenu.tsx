import { useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../redux/store';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.email}</p>
      <Button
        type="button"
        onClick={() => dispatch(logOut())}
        variant="contained"
        color="success"
      >
        Logout
      </Button>
      {/* <button type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button> */}
    </div>
  );
};
