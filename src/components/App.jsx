import { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import css from "./App.module.css"

const App = () => {
    const [contacts, setContacts] = useState(() => { return JSON.parse(localStorage.getItem('contacts')) ?? []; });
    const [filter, setFilter] = useState('');


    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts))
    },[contacts])

    const formSubmitHandler = newContact => {
        if (contacts.some(value => value.name === newContact.name)) {
            alert(`${newContact.name} is already in contacts`)
        } else {
            setContacts(state => ([...state, newContact ]))
        }
    }

    const handleDelete = contactId => {
        setContacts(contacts.filter(contact => contact.id !== contactId))
    }

    const changeFilter = e => {
        setFilter(e.currentTarget.value)
    }

    const getFiltredContacts = () => {

        const normalizeFilter = filter.toLowerCase();

        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
    }

            return (
            <div className={css.main}>
                <h1 className={css.title}>Phonebook</h1>
                <ContactForm onSubmit={formSubmitHandler} />
                <h2 className={css.upperTitle}>Contacts</h2>
                <Filter onChange={changeFilter} value={filter} />
                <ContactList contacts={getFiltredContacts()} onDelete={handleDelete}  />
            </div>
        );

}

export default App