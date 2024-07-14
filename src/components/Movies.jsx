import React, { useState, useEffect } from 'react'
import MovieCardCarousel from './MovieCardCarousel'

function Movies() {
    const [movies, setMovies] = useState([])

    useEffect(()=> {
      const apiKey = import.meta.env.VITE_API_KEY
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
          .then((res) => res.json())
          .then((data) => setMovies(data.results))
    }, [])

  return (
    <div>
        <MovieCardCarousel movies={movies} />
    </div>

  )
}

export default Movies
