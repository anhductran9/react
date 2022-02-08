import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState(persons);
  const [updateData, setUpdateData] = useState(0)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [updateData]);

  const addName = (event) => {
    event.preventDefault();
    //checks whether a name is exist
    let exist = 0
    for (let person of persons) {
      if (person.name === newName) {
        exist = person.id
        break;
      }
    }
    console.log('Exist: ' + exist)
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    };
    const numberObject = {
      number: newNumber,
      id: exist ? exist : persons.length + 1,
    };
    let merged = { ...nameObject, ...numberObject };
    if (exist) {
      let confirmReplace = window.confirm(`${newName} is already added to phonebook`);
      if (confirmReplace) {
        personService.replaceData(exist, merged).then((res) => console.log(res))
        setUpdateData(updateData + 1)
      }
    } else {
      setPersons(persons.concat(merged));
      setNewName("");
      setNewNumber("");
      setUpdateData(updateData + 1)
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
