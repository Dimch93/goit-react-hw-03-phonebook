import { Component } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) this.setState({ contacts: JSON.parse(contacts) });
    else this.setState({ contacts: [] });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ newContacts, name, number }) => {
    const contactsObj = {
      ...newContacts,
      id: nanoid(),
      name,
      number,
    };

    const nameContact = this.state.contacts.find(
      contact => contact.name === name
    );
    if (nameContact) {
      return alert(`${name} is already in contacts!!!`);
    }

    this.setState(prev => ({
      contacts: [...prev.contacts, contactsObj],
    }));
  };

  deleteContacts = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <PhonebookForm addContacts={this.addContacts} />
          <h2>Contacts</h2>
          {this.state.contacts.length > 0 ? (
            <Filter value={filter} onChangeFilter={this.changeFilter} />
          ) : (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20,
              }}
            >
              Your phonebook is empty. Add first contact!
            </p>
          )}
          <ContactsList
            contacts={visibleContacts}
            deleteContacts={this.deleteContacts}
          />
        </div>
      </>
    );
  }
}

export default App;
