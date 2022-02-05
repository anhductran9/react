import React, { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(" ");
  const [nameFilter, setNameFilter] = useState("");
  const [filteredName, setFilteredName] = useState(persons);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault();
    //checks whether a name is exist
    const exist = persons.some((persons) => persons.name === newName);
    if (exist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        id: persons.length + 1,
      };
      const numberObject = {
        number: newNumber,
        id: persons.length + 1,
      };
      let merged = { ...nameObject, ...numberObject };
      setPersons(persons.concat(merged));
      setNewName("");
      setNewNumber("");
    }
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
