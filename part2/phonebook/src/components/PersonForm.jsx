const PersonInput = ({ text, value, handleChange }) => {
  return (
    <div>{text}<input value={value} onChange={handleChange} /></div>
  )
}

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
      <PersonInput text='name: ' value={newName} handleChange={handleNameChange} />
      <PersonInput text='number: ' value={newNumber} handleChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm