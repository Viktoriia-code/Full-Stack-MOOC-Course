import { useState } from 'react'

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  if (props.total == 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={props.score/props.total} />
          <StatisticLine text="positive" value={props.good/props.total*100 + ' %'} />
        </tbody>
      </table>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    const updatedTotal = total + 1
    const updatedScore = score + 1
    setTotal(updatedTotal)
    setScore(updatedScore)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
  }

  const handleBad = () => {
    setBad(bad + 1)
    const updatedTotal = total + 1
    const updatedScore = score - 1
    setTotal(updatedTotal)
    setScore(updatedScore)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} score={score} />
    </div>
  )
}

export default App