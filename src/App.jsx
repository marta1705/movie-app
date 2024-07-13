import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(()=> {
    const apiKey = import.meta.env.VITE_API_KEY
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => setMovies(data.results))
  }, [])

  console.log(movies)
  return (
    <h1>Hello</h1>
  )
}

export default App
