const PersonForm = ({ persons,newName,newNumber,handleNameChange,handleNumberChange,setPersons,setNewName,setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault()
    if (checkPerson(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const checkPerson = (name) => {
    if (persons.find(x => x.name === name)) {
      return true
    } else {
      return false
    }
  }

  return(
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm