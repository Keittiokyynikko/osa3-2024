import { useState } from 'react'

const Button = (props) => {
  return (
    <>
    <button onClick={props.handleclick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </>
  )
}

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  const average = ((props.good * 1)+(props.neutral * 0)+(props.bad * (-1))) / all
  const positive = ((props.good * 1) / (props.good + props.neutral + props.bad)) * 100

  if(props.good !== 0 || props.neutral !== 0 || props.bad !== 0) {
    return (
      <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={Math.round(average * 10) / 10} />
        <StatisticLine text="all" value={Math.round(positive * 100) / 100 + " %"} />
        </tbody>
      </table>
      </>
    )
  } else {
    return( 
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleclick={handleGood} text="good"/>
      <Button handleclick={handleNeutral} text="neutral"/>
      <Button handleclick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App