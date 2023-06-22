const AddNewPersonForm = ({ addPerson, newName, typeNewName, newPhone, typeNewPhone }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={typeNewName}/>
      <br />
      number: <input value={newPhone} onChange={typeNewPhone}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default AddNewPersonForm;