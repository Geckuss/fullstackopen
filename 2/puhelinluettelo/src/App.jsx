import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <div>
        {contacts.map((contact, index) => (
          <p key={index}>
            {contact.name}: {contact.number}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App