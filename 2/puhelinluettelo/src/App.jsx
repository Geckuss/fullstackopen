import { useState } from 'react'

// Filter component
const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Search: <input value={searchTerm} onChange={handleSearchChange} />
  </div>
)

// PersonForm component
const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleConcat }) => (
  <form onSubmit={handleConcat}>
    <div>
      Name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

// Persons component
const Persons = ({ contacts }) => (
  <div>
    {contacts.map((contact, index) => (
      <p key={index}>
        {contact.name}: {contact.number}
      </p>
    ))}
  </div>
)

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleConcat = (event) => {
    event.preventDefault();
    const isNameExist = contacts.some(contact => contact.name === newName);
    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setContacts(contacts.concat({ name: newName, number: newNumber}));
      setNewName('');
      setNewNumber('');
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.number.includes(searchTerm)
  );
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleConcat={handleConcat}
      />
      <Persons contacts={filteredContacts} />
    </div>
  )
}

export default App