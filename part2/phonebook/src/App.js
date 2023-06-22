import { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import AddNewPersonForm from './components/AddNewPersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        setPersons(response.data);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) { //If the person's name is already in the phonebook
      alert(`${newName} is already added to phonebook`); //Alert
    } else {
      setPersons(persons.concat({name: newName, number: newPhone})); //Add new person
      setNewName(''); //Set name input to blank
      setNewPhone(''); //Set phone input to blank
      setSearchName(''); //Set search input to blank
    };
  }

  const typeNewName = (event) => {
    console.log('typing: ', event.target.value);
    setNewName(event.target.value);
  }

  const typeNewPhone = (event) => {
    console.log('typing: ', event.target.value);
    setNewPhone(event.target.value);
  }

  const typeSearchName = (event) => {
    console.log('typing: ', event.target.value);
    setSearchName(event.target.value);
  }

  const PersonsToShow = searchName
    ? persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchName={searchName} typeSearchName={typeSearchName} />
      <h2>Add a new person</h2>
      <AddNewPersonForm addPerson={addPerson} newName={newName} typeNewName={typeNewName} newPhone={newPhone} typeNewPhone={typeNewPhone} />
      <h2>Numbers</h2>
      <Persons persons={PersonsToShow}/>
    </div>
  )
}

export default App