import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Title } from './App.styles';

function getInitialContacts() {
  const contacts = localStorage.getItem('contacts');

  if (contacts !== null) {
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  }
  return [];
}

export function App() {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(contact => contact.name === name)
      ? Report.warning(`${name}`, 'Such a name already exists!', 'OK')
      : setContacts(prevState => [newContact, ...contacts]);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
  };

  const handleFilterChange = event => setFilter(event.currentTarget.value);

  const deleteContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <Title>Contacts</Title>
      <Filter filter={filter} changeFilter={handleFilterChange} />
      <ContactList
        filter={filterContacts()}
        onDeleteContacts={deleteContacts}
      />
    </Container>
  );
}
