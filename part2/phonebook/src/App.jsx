import { useState } from 'react'

const PersonsData = ({ persons, filter }) => {
  const filteredPersons = persons.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  return(
    <>
    {filteredPersons.map(person => 
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const checkPerson = (name) => {
    if (persons.find(x => x.name === name)) {
      return true
    } else {
      return false
    }
  }

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>filter shown with: <input value={newFilter} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonsData persons={persons} filter={newFilter} />
    </div>
  )
}

export default App