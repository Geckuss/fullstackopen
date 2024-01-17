import { useState } from 'react'

const Statistics = props => {
  if (props.allVotes > 0){
    return (
      <div>
        <h2>Results</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All votes" value={props.allVotes} />
            <StatisticLine text="Average" value={props.average} />
            <StatisticLine text="Positive" value={`${props.positive}%`} />
          </tbody>
        </table>
      </div>
    );
  }
  return(
    <div>
      <p>No feedback given</p>
    </div> 
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
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
      <Button onClick={() => handleButtonClick('Good')} text="Good" />
      <Button onClick={() => handleButtonClick('Neutral')} text="Neutral" />
      <Button onClick={() => handleButtonClick('Bad')} text="Bad"/>
      <div>
        <Statistics good = {good} neutral = {neutral} bad = {bad} allVotes = {allVotes} average = {average} positive = {positive}/>
      </div>
    </div>
  )
}

export default App