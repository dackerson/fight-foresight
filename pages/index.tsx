import { useState, useEffect, FormEvent } from 'react';
 
export default function Page() {
  const [matchList, setMatchList] = useState([])
  const [newMatch, setNewMatch] = useState([])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    // const formData = new FormData(event.currentTarget)

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: newMatch,
    })
 
    // Handle response if necessary
    const data = await response.json()
    setMatchList(data)
  }
 
  useEffect(() => {
    fetch('/api/matches')
      .then((res) => res.json())
      .then((data) => {
        setMatchList(data)
      })
  }, [])

  const handleInputChange = (event) => {
    setNewMatch(event.target.value);
  };

  return (
    <div>
      <div className="new-match-form">
        Add new match:
        <form onSubmit={onSubmit}>
          <input type="text" name="name" onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="match-list">
        Current list of matches:
        <ul>
          {RenderMatchList(matchList)}
        </ul>
      </div>
    </div>
  )
}

function RenderMatchList(matchList) {
  return (
    matchList.map((match) => {
      return (
        <li key={match.title}>
          {match.title}
        </li>)
    })
  )
}