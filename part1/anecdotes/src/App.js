import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
     
  const createInitialArray = () => {
    let arr = [];
    for (let i = 0; i < anecdotes.length; i++) {
      arr.push(0);
    }
    return arr;
  }
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(createInitialArray);
  
  const RandomAnecdote = () => {
    let min = 0;
    let max = anecdotes.length - 1;
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    setSelected(randomNum);
  }

  const copy = [...votes];

  const vote = () => {
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br />
      <Button handleClick={vote} name='vote' />
      <Button handleClick={RandomAnecdote} name='next anecdote' />
    </div>
  )
}

const Button = (props) => (
  <>
    <button onClick={props.handleClick}>{props.name}</button>
  </>
)

export default App;