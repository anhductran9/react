import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Person = ({person})=>{
  const alertDelete = (event) => {
    const result = window.confirm('Delete ' + person.name + '?');
    if (result) {
      axios.delete(`http://localhost:3001/persons/${person.id}`).then(() => console.log('delete: ' + person.id))
    }
  }

  const alertReplace = (event) => {
    const tluser = window.confirm('Replace' + person.number + '?');  
    if (tluser) {
      axios.replace(`http://localhost:3001/persons/${person.id}`).then(() => console.log('replace: ' + person.id))
    }
  }
  return (
    <li>
      {person.name}{person.number} <button onClick={alertDelete}>Delete</button>
    </li>
  )
}

export default Person
