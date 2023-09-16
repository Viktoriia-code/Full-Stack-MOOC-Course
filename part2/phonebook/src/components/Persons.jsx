const Persons = ({ persons, filter }) => {
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

export default Persons