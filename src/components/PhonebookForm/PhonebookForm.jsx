import { Component } from 'react';
import css from './PhonebookForm.module.css';

class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContacts(this.state);
    this.reset();
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.form} type="submit" onSubmit={this.handleSubmit}>
        <div className={css.input}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.input}>
          <label>Number</label>
          <input
            name="number"
            type="tel"
            onChange={this.handleChange}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default PhonebookForm;
