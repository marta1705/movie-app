import React, { useState, useEffect } from 'react'
import MovieCardCarousel from './MovieCardCarousel'

export default function Movies() {
    const [movies, setMovies] = useState([])

    const date = new Date()
    const day = ('0' + date.getDate()).slice(-2)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    const monthLater = parseInt(month) + 1 < 10 ? `0${parseInt(month) + 1}` : parseInt(month) + 1
    const min_date = `${year}-${month}-${day}`
    const max_date = `${year}-${monthLater}-${day}`

    useEffect(()=> {
      const apiKey = import.meta.env.VITE_API_KEY
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`)
          .then((res) => res.json())
          .then((data) => setMovies(data.results))
    }, [])

    const filteredMovies = movies.filter(movie => movie.backdrop_path !== null)

  return (
    <div>
        <MovieCardCarousel movies={filteredMovies} type="movies"/>
    </div>

  )
}

