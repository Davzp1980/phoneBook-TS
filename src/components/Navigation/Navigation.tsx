import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';
import clsx from 'clsx';

type activeLinkProps = {
  isActive: boolean;
};
export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  function activeLink({ isActive }: activeLinkProps) {
    return clsx(css.link, isActive && css.active);
  }

  return (
    <nav>
      <NavLink className={activeLink} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={activeLink} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
