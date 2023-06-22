import { useState, useEffect } from 'react';

import Search from './components/Search';
import AddNewPersonForm from './components/AddNewPersonForm';
import Persons from './components/Persons';
import personServices from './services/person'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    personServices
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone
    }

    if (persons.some(person => person.name === newName)) { //If the person's name is already in the phonebook
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        let personToUpdate = persons.find(person => person.name === newName)
        personServices
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson));
          });
      }
    } else {
      personServices
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName(''); //Set name input to blank
          setNewPhone(''); //Set phone input to blank
          setSearchName(''); //Set search input to blank    
        })
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

  const removePerson = (event) => {
    const idToDelete = Number(event.target.id);
    const nameToDelete = persons.find(person => person.id === idToDelete).name
    if (window.confirm(`Delete ${nameToDelete}?`)) {
      personServices
        .remove(event.target.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== idToDelete));
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchName={searchName} typeSearchName={typeSearchName} />
      <h2>Add a new person</h2>
      <AddNewPersonForm addPerson={addPerson} newName={newName} typeNewName={typeNewName} newPhone={newPhone} typeNewPhone={typeNewPhone} />
      <h2>Numbers</h2>
      <Persons persons={PersonsToShow} deletePerson={removePerson} />
    </div>
  )
}

export default App