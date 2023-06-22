const Person = ({ person, deletePerson }) => (
  <div>
    <p>
      {person.name} {person.number}
      <button id={person.id} onClick={deletePerson}>delete</button>
    </p>
  </div>
)

export default Person;