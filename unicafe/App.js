import React, {useState} from 'react'

// a proper place to define a component
const Statistics = (props) => {
  if (props.allClicks ===0){

    return (
      <div>
        <h1>Statistics</h1>
        No feedbacks given
      </div>
    )
  }
  return (
    <div>
    <h1>Statistics</h1>
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{props.all}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{props.average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{props.positive}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own stat
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = (good / (all-neutral)) * 100
  const [allClicks, setAll] = useState(0)

  const setButton = (data, setData) => {
    setData(data + 1)
    setAll(1)
  }

  return (
    <div>
      <h1>Give feedbacks</h1>
      <Button onClick={() => setButton(good, setGood)} text='good'/>
      <Button onClick={() => setButton(neutral, setNeutral)} text='neutral'/>
      <Button onClick={() => setButton(bad, setBad)} text='bad'/>
      <Statistics setAll={setAll} allClicks={allClicks} good={good} neutral={neutral} bad={bad}
                  all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App