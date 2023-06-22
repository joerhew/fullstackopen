import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '416 123 4567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) { //If the person's name is already in the phonebook
      alert(`${newName} is already added to phonebook`); //Alert
    } else {
      setPersons(persons.concat({name: newName, phone: newPhone})); //Add new person
      setNewName(''); //Set name input to blank
      setNewPhone(''); //Set phone input to blank
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={typeNewName}/>
          name: <input value={newPhone} onChange={typeNewPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

const Persons = ({ persons }) => {
  return persons.map(person => 
    <Person key={person.name} person={person} />
  )
}

const Person = ({ person }) => (
  <>
    <p>{person.name} {person.phone}</p>
  </>
)

export default App