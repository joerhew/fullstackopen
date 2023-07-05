const Person = ({ person, deletePerson }) => (
  <div>
    <p>
      {person.name} {person.number}
      <button id={person.id} data-name={person.name} onClick={deletePerson}>delete</button>
    </p>
  </div>
)

export default Person;