import React from 'react';
import { Contact, Button } from './ContactList.styles';
import PropTypes from 'prop-types';

function ContactList({ filter, onDeleteContacts }) {
  return (
    <ul>
      {filter.map(({ id, name, number }) => {
        return (
          <Contact key={id}>
            {name} - {number}
            <Button onClick={() => onDeleteContacts(id)}>Delete</Button>
          </Contact>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  filter: PropTypes.array.isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
};

export default ContactList;
