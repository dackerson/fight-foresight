import { useState, useEffect, FormEvent } from 'react';
 
export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    console.log(data)
  }
 
  const [matchList, setMatchList] = useState([])
  
  useEffect(() => {
    fetch('/api/matches')
      .then((res) => res.json())
      .then((data) => {
        setMatchList(data)
      })
  }, [])

  return (
    <div>
      <div className="new-match-form">
        <form onSubmit={onSubmit}>
          <input type="text" name="name" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="match-list">
        {RenderMatchList(matchList)}
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