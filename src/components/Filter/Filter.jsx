import React from 'react';
import { Label, Text } from './Filter.styled';
import PropTypes from 'prop-types';

function Filter({ filter, changeFilter }) {
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
        onChange={changeFilter}
      />
    </Label>
  );
}

export default Filter;

Filter.propType = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
