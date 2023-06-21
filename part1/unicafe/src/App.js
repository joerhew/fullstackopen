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

const Statistics = (props) => {
  if (props.allCount === 0) {
    return (
      <>
        <Header text="statistics" />
        <p>No feedback given</p>  
      </>
    )
  }
  return (<>
    <Header text="statistics" />
    <table>
      <tbody>
        <StatisticsLine text={props.goodName} value={props.goodCount} />
        <StatisticsLine text={props.neutralName} value={props.neutralCount} />
        <StatisticsLine text={props.badName} value={props.badCount} />
        <StatisticsLine text={props.allName} value={props.allCount} />
        <StatisticsLine text={props.avgName} value={props.avgCount} />
        <StatisticsLine text={props.posName} value={props.posPerc} />
      </tbody>
    </table>
  </>
  )
}

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)


export default App;
