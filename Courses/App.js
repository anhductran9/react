import React from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const Course = ({course}) => {
  const {name, parts} = course
  const exercises = parts.map(part => part.exercises)
  return (
    <>
    <Header course={name}/>
    <Content parts={parts}/>
    <Total exercises={exercises}/>
    </>
  )
} 

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => (
        <Course course={course} />
      ))}
    </div>
  )
}
export default App