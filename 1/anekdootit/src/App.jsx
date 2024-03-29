import React, { useState } from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
}

const App = () => {
  const anecdotesList = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  const [anecdotes, setAnecdotes] = useState(anecdotesList);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotesList.length));

  const handleButtonClick = (type) => {
    if (type === 'Anecdote') {
      const newSelected = Math.floor(Math.random() * anecdotes.length);
      setSelected(newSelected);
    } else if (type === 'Vote') {
      const newPoints = [...points];
      newPoints[selected] += 1;
      setPoints(newPoints);
    }
  }

  const mostVotedIndex = points.indexOf(Math.max(...points));

  return (
    <>
      <div>
        <Button onClick={() => handleButtonClick('Anecdote')} text="Anecdote" />
        <Button onClick={() => handleButtonClick('Vote')} text="Vote" />
      </div>
      <div>
        <h2>Current Anecdote</h2>
        {anecdotes[selected]}
      </div>
      <div>
        <p>This anecdote has {points[selected]} votes</p>
      </div>
      <div>
        <h2>Most Voted Anecdote</h2>
        {anecdotes[mostVotedIndex]}
      </div>
      <div>
        <p>It has {points[mostVotedIndex]} votes</p>
      </div>
    </>
  );
}

export default App;
