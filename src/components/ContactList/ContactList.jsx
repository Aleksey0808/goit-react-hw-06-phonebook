import React from 'react';
import { Contact, Button } from './ContactList.styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => {
    return state.contacts.items.filter(item =>
      item.name.toLowerCase().trim().includes(state.filter.toLowerCase().trim())
    );
  });

  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact key={id}>
            {name} - {number}
            <Button onClick={() => dispatch(deleteContact(id))}>Delete</Button>
          </Contact>
        );
      })}
    </ul>
  );
}

export default ContactList;
