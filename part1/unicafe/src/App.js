import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const avg = good*1 + neutral*0 + bad*-1;
  const pos = ((good + neutral) / all) * 100;

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      <Statistics goodName="good" goodCount={good} neutralName="neutral" neutralCount={neutral} badName="bad" badCount={bad} allName="all" allCount={all} avgName="average" avgCount={avg} posName="positive" posPerc={pos + '%'} />

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

const Statistics = (props) => (
  <>
    <Header text="statistics" />
    <p>{props.goodName} {props.goodCount}</p>
    <p>{props.neutralName} {props.neutralCount}</p>
    <p>{props.badName} {props.badCount}</p>
    <p>{props.allName} {props.allCount}</p>
    <p>{props.avgName} {props.avgCount}</p>
    <p>{props.posName} {props.postPerc}</p>
  </>
)

export default App;
