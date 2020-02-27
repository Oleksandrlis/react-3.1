import React, { Component } from "react";
import uuid from "uuid";

class Telefonebook extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" }
    ],
    filteredContacts: [],
    filter: "",
    name: "",
    number: ""
  };  

  componentDidMount() {
    if (localStorage.getItem("contacts") !== null) {
      console.log('localStorage.getItem("contacts"', localStorage.getItem("contacts"))
      this.setState(prevState => ({
        contacts: [...prevState.contacts, ...JSON.parse(localStorage.getItem("contacts"))],
        filteredContacts: [...prevState.contacts, ...JSON.parse(localStorage.getItem("contacts"))]
      }));
    }
  }

  handleChange = e => {
    const name = e.target.name;

    this.setState({ [name]: e.target.value });
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value,
      filteredContacts: this.state.contacts.filter(item =>
        item.name.includes(e.target.value)
      )
    });
  };

  handleDelete = e => {
    const id = e.target.id;
    this.setState(prevState => {
      localStorage.setItem('contacts', JSON.stringify([...prevState.contacts.filter(item => item.id !== id)]))
      return {
      contacts: [...prevState.contacts.filter(item => item.id !== id)],
      filteredContacts: [...prevState.contacts.filter(item => item.id !== id)],
      filter: ""
    }})
      
  };


  createObject = e => {
    e.preventDefault();
    console.log('this.state.contacts', this.state.contacts)
    localStorage.setItem(
      "contacts",
      JSON.stringify([...this.state.contacts,  { name: this.state.name, number: this.state.number, id: uuid() }]));
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: this.state.name, number: this.state.number, id: uuid() }
      ],
      name: " ",
      number: " "
    }));
  };

  render() {
    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={this.createObject}>
          <h3>Name</h3>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <h3>Number</h3>
          <input
            type="text"
            name="number"
            onChange={this.handleChange}
            value={this.state.number}
          />

          <button type="submit">Add contact</button>
        </form>

        <h2>Contacts</h2>
        <h3>Find contacts by name</h3>
        <input
          type="text"
          name="filter"
          onChange={this.handleFilter}
          value={this.state.filter}
        />
        <ul>
          {this.state.filter !== ""
            ? this.state.filteredContacts.map(object => (
                <li key={object.id}>
                  <button
                    type="button"
                    id={object.id}
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                  <span>Name: {object.name} </span>
                  <span>Number: {object.number}</span>
                </li>
              ))
            : this.state.contacts.map(object => (
                <li key={object.id}>
                  <button
                    type="button"
                    id={object.id}
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                  <span>Name: {object.name} </span>
                  <span>Number: {object.number}</span>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
export default Telefonebook;
