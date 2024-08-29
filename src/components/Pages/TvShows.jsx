import React, { useState, useEffect } from 'react'
import MovieCardCarousel from '../MovieCardCarousel'
import DropdownMenu from '../DropdownMenu'
import { useNavigate } from 'react-router-dom'
import PaginationComponent from '../PaginationComponent'
import MovieCard from '../MovieCard'

export default function TvShows() {
    const [tvShows, setTvShows] = useState([])
    const [upcomingTvShows, setUpcomingTvShows] = useState([])
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
    const [popularShows, setPopularShows] = useState([])
    const [page, setPage] = useState(1)
    const numOfPages = 20
    const navigate = useNavigate()

    const apiKey = import.meta.env.VITE_API_KEY

    const date = new Date()
    const day = ('0' + date.getDate()).slice(-2)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    const daysLater = parseInt(day) + 7 < 10 ? `0${parseInt(day) + 7}` : parseInt(day) + 7
    const min_date = `${year}-${month}-${day}`
    const max_date = `${year}-${month}-${daysLater}`
    const numOfYears = year - 1950 + 1

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
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte${max_date}&air_date.gte=${min_date}`)
          .then((res) => res.json())
          .then((data) => setTvShows(data.results))  

      fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&languages=en-US`)
          .then((res) => res.json())
          .then((data) => setGenres(data.genres))

      fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`)
          .then((res) => res.json())
          .then((data) => setCountries(data))

      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`)
          .then((res) => res.json())
          .then((data) => setPopularShows(data.results))  
      
    }, [page])

    useEffect(() => {
      const fetchDetails = async () => {
          const fetchPromises = tvShows.map(tvShow => {
              return fetch(`https://api.themoviedb.org/3/tv/${tvShow.id}?api_key=${apiKey}`)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                      return response.json();
                  });
          });
          try {
              const details = await Promise.all(fetchPromises);
              const upcomingShows = details.filter(detail => 
                  detail.next_episode_to_air &&
                  detail.next_episode_to_air.air_date >= min_date && 
                  detail.next_episode_to_air.air_date <= max_date
              );
              setUpcomingTvShows(upcomingShows);
          } catch (error) {
              console.error('Error fetching TV show details:', error);
          }
      };

      if (tvShows.length > 0) {
          fetchDetails();
      }
  }, [tvShows]);

  console.log(upcomingTvShows)

  function handleGenreSelect(selectedGenre) {
    navigate(`/tvshows/genres/${selectedGenre}`)
  }

  function handleCountrySelect(selectedCountry) {
    navigate(`/tvshows/countries/${selectedCountry}`)
  }

  function handleYearSelect(selectedYear) {
    navigate(`/tvshows/years/${selectedYear}`)
  }

  function handleRatingSelect(selectedRating) {
    navigate(`/tvshows/ratings/${selectedRating}`)
  }

  function handleClick(id) {
    navigate(`/tvshows/${id}`)
  }

  return (
    <div>
        <MovieCardCarousel movies={upcomingTvShows} type="tvShows" onClick={handleClick}/>
        <div className="main-container">
          <div className='dropdowns-container--main'>
            <DropdownMenu options={genres} name="Genres" onChange={handleGenreSelect}/>
            <DropdownMenu options={countries} name="Countries" onChange={handleCountrySelect}/>
            <DropdownMenu options={years} name="Years" onChange={handleYearSelect}/>
            <DropdownMenu options={ratings} name="Ratings" onChange={handleRatingSelect}/>
          </div>
          <span>
            POPULAR TV SHOWS
          </span>
          <div className='popular-movies-container'>
            {popularShows && popularShows.map(show => (
              <MovieCard key={show.id} movie={show} onClick={handleClick} type="tvShow" />
            ))}
          </div>
        </div>
        <PaginationComponent setPage={setPage} currentPage={page} numOfPages={numOfPages} />
    </div>

  )
}


