import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      <Header text="statistics" />
      <Stat />
      <Stat name="good" count={good} />
      <Stat name="neutral" count={neutral} />
      <Stat name="bad" count={bad} />
    </div>
  )
}

const Button = (props) => (
  <>
    <button onClick={props.handleClick}>{props.text}</button>
  </>
)

const Header = (props) => (
  <>
    <h1>{props.text}</h1>
  </>
)

const Stat = (props) => (
  <>
    <p>{props.name} {props.count}</p>
  </>
)

export default App;
