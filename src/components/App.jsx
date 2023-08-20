import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/AddContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const isContactExists = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() || contact.number === number
    );

    if (isContactExists) {
      alert(`${name} or phone number ${number} is already in the phonebook`);
      return;
    }

    const newContact = {
      id: `id-${Date.now()}`,
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        onAddContact={handleAddContact}
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
}

export default App;
