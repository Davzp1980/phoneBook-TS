import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import clsx from 'clsx';

type AuthNavProps = {
  isActive: boolean;
};

export const AuthNav = () => {
  function activeLink({ isActive }: AuthNavProps) {
    return clsx(css.link, isActive && css.active);
  }

  return (
    <div>
      <NavLink className={activeLink} to="/register">
        Register
      </NavLink>
      <NavLink className={activeLink} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
