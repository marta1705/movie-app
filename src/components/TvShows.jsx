import React, { useState, useEffect } from 'react'
import MovieCardCarousel from './MovieCardCarousel'
import DropdownMenu from './DropdownMenu'
import { useNavigate } from 'react-router-dom'

export default function TvShows() {
    const [tvShows, setTvShows] = useState([])
    const [upcomingTvShows, setUpcomingTvShows] = useState([])
    const [genres, setGenres] = useState([])
    const [countries, setCountries] = useState([])
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

    const ratings = new Array(10).fill().map((value, index) => (
      {
        id: index,
        name: `${index} - ${parseInt(index) + 1} ★`,
        values: {
          min: index, 
          max: parseInt(index) + 1
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
    }, [])

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

  return (
    <div>
        <MovieCardCarousel movies={upcomingTvShows} type="tvShows"/>
        <div className="main-container">
          <div className='dropdowns-container--main'>
            <DropdownMenu options={genres} name="Genres" onChange={handleGenreSelect}/>
            <DropdownMenu options={countries} name="Countries" onChange={handleCountrySelect}/>
            <DropdownMenu options={years} name="Years" onChange={handleYearSelect}/>
            <DropdownMenu options={ratings} name="Ratings" onChange={handleRatingSelect}/>
          </div>
        </div>
    </div>

  )
}


