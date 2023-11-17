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
    return this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.form} type="submit" onSubmit={this.handleSubmit}>
        <div className={css.input}>
          <label htmlFor="exampleInputName" className="">
            Name
          </label>
          <input
            name="name"
            type="text"
            className=""
            id="exampleInputName"
            value={this.state.value}
            onChange={this.handleChange}
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.input}>
          <label htmlFor="exampleInputNumber" className="">
            Number
          </label>
          <input
            name="number"
            type="tel"
            className=""
            id="exampleInputNumber"
            onChange={this.handleChange}
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit" className="">
          Add contact
        </button>
      </form>
    );
  }
}

export default PhonebookForm;
