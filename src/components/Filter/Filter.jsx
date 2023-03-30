import React from 'react';
import { Label, Text } from './Filter.styled';

import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from '../../redux/filterSlice';

function Filter() {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);

  const showFilteredContacts = e => {
    dispatch(filterContacts(e.target.value));
  };

  return (
    <Label>
      <Text>Find contacts by name </Text>
      <br />
      <input
        type="text"
        value={filter}
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={showFilteredContacts}
      />
    </Label>
  );
}

export default Filter;
