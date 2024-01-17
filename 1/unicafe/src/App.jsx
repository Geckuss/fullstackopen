import { useState } from 'react'

const Statistics = props => {
  if (props.allVotes > 0){
    return(
      <div>
        <h2>Results</h2>
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
        <p>All votes: {props.allVotes}</p>
        <p>Average: {props.average}</p>
        <p>Positive: {props.positive}%</p>
      </div>
    )
  }
  return(
    <div>
      <p>No feedback given</p>
    </div> 
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allVotes, setAllVotes] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleButtonClick = (type) => {
    // Update the corresponding state based on the button type
    if (type === 'Good') {
      const newGood = good + 1
      setGood(newGood);
      setAllVotes(newGood + neutral + bad);
      setAverage((newGood + bad*-1) / (newGood + neutral + bad))
      setPositive(newGood/(newGood+neutral+bad)*100)
    } else if (type === 'Neutral') {
      const newNeutral = neutral + 1
      setNeutral(newNeutral);
      setAllVotes(good + newNeutral + bad);
      setAverage((good + newNeutral*0 + bad*-1) / (good + newNeutral + bad))
      setPositive(good/(good+newNeutral+bad)*100)
    } else if (type === 'Bad') {
      const newBad = bad + 1
      setBad(newBad);
      setAllVotes(good + neutral + newBad);
      setAverage((good + newBad*-1) / (good + neutral + newBad))
      setPositive(good/(good+neutral+newBad)*100)
    }
    
  };

  return (
    <div>
      <h2>Feedback</h2>
      <button onClick={() => handleButtonClick('Good')}>Good</button>
      <button onClick={() => handleButtonClick('Neutral')}>Neutral</button>
      <button onClick={() => handleButtonClick('Bad')}>Bad</button>
      <div>
        <Statistics good = {good} neutral = {neutral} bad = {bad} allVotes = {allVotes} average = {average} positive = {positive}/>
      </div>
    </div>
  )
}

export default App