import { ChangeEvent, useId } from 'react';
import css from './SearchBox.module.css';

import { changeFilter } from '../../redux/filters/slice';
import { useAppDispatch } from '../../redux/store';

export function SearchBox() {
  const searchFieldId = useId();

  const dispatch = useAppDispatch();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(changeFilter(e.target.value));
  }

  return (
    <div className={css.div}>
      <label htmlFor={searchFieldId}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        name="search"
        id={searchFieldId}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default SearchBox;
