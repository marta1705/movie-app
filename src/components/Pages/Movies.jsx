import React, { useState, useEffect } from 'react'
import MovieCardCarousel from '../MovieCardCarousel'
import DropdownMenu from '../DropdownMenu'
import { useNavigate, useParams } from 'react-router-dom'
import MovieCard from '../MovieCard'
import PaginationComponent from '../PaginationComponent'

export default function Movies() {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [page, setPage] = useState(1)
    const numOfPages = 20

    const navigate = useNavigate()

    const date = new Date()
    const day = ('0' + date.getDate()).slice(-2)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    const monthLater = parseInt(month) + 1 < 10 ? `0${parseInt(month) + 1}` : parseInt(month) + 1
    const min_date = `${year}-${month}-${day}`
    const max_date = `${year}-${monthLater}-${day}`

    const numOfYears = year - 1900 + 1
    let firstYear = year

    const years = new Array(numOfYears).fill().map((value, index) => (
      {
        id: index,
        name: (firstYear--).toString(),
      }
    ))

    const ratings = new Array(5).fill().map((value, index) => (
      {
        id: index,
        name: `${index * 2} - ${parseInt(index) * 2 + 2} ★`,
        values: {
          min: index * 2, 
          max: parseInt(index) * 2 + 2
        }
      }
    ))

    useEffect(()=> {
      const apiKey = import.meta.env.VITE_API_KEY
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`)
          .then((res) => res.json())
          .then((data) => setMovies(data.results))
      
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&languages=en-US`)
          .then((res) => res.json())
          .then((data) => setGenres(data.genres))

      fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`)
          .then((res) => res.json())
          .then((data) => setCountries(data))

      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
          .then((res) => res.json())
          .then((data) => setPopularMovies(data.results))
    }, [page])

    console.log(popularMovies)

    const filteredMovies = movies.filter(movie => movie.backdrop_path !== null)

    function handleGenreSelect(selectedGenre) {
      navigate(`/movies/genres/${selectedGenre}`)
    }

    function handleCountrySelect(selectedCountry) {
      navigate(`/movies/countries/${selectedCountry}`)
    }

    function handleYearSelect(selectedYear) {
      navigate(`/movies/years/${selectedYear}`)
    }

    function handleRatingSelect(selectedRating) {
      navigate(`/movies/ratings/${selectedRating}`)
    }

    function handleClick(id) {
      navigate(`/movies/${id}`)
    }

  return (
    <div>
        <MovieCardCarousel movies={filteredMovies} type="movies" onClick={handleClick}/>
        <div className="main-container">
          <div className='dropdowns-container--main'>
            <DropdownMenu options={genres} name="Genres" onChange={handleGenreSelect}/>
            <DropdownMenu options={countries} name="Countries" onChange={handleCountrySelect}/>
            <DropdownMenu options={years} name="Years" onChange={handleYearSelect}/>
            <DropdownMenu options={ratings} name="Ratings" onChange={handleRatingSelect}/>
          </div>
          <span>
            POPULAR MOVIES
          </span>
          <div className='popular-movies-container'>
            {popularMovies && popularMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={handleClick} type="movie" />
            ))}
          </div>
        </div>
        <PaginationComponent setPage={setPage} currentPage={page} numOfPages={numOfPages} />
    </div>

  )
}

