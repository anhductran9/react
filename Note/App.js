import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(" ");
  const [newNumber, setNewNumber] = useState(" ");
  const [filteredName, setFilteredName] = useState(persons);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const addName = (event) => {
    event.preventDefault();
    //checks whether a name is exist
    const exist = persons.some((persons) => persons.name === newName);
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    };
    const numberObject = {
      number: newNumber,
      id: persons.length + 1,
    };
    let merged = { ...nameObject, ...numberObject };
    if (exist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(merged));
      setNewName("");
      setNewNumber("");
    }
    personService
      .create(merged)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('')
      })
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilteredName(persons.filter(person => person.name.includes(event.target.value)))
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        filter: <input 
        onChange={handleFilterChange} />
        <ul>
          {filteredName.map((person) => <Person key={person.id} person={person} />)}
        </ul>
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <ul>
        {persons.map((person) => <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  );
};

export default App;
