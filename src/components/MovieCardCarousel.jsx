import React, { useEffect, useState } from 'react'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'

export default function MovieCardCarousel({movies, type, onClick}) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlide(prevSlide => (prevSlide === movies.length - 1 ? 0 : prevSlide + 1))
    }, 5000)
    return () => clearInterval(intervalId)
  }, [movies.length])

  const nextSlide = () => {
    setSlide(slide === movies.length - 1 ? 0 : slide + 1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? movies.length - 1 : slide - 1)
  }

  return (
    <div className='movie-card--slide'>
      <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide}/>
        {movies.map((movie, idx) => {
            return (
              <div key={movie.id} className={slide === idx ? 'movie-card--slide-content' : 'movie-card--slide-content movie-photo-hidden'}>
                <div className='movie-card--desc'>
                  <h1 className='coming-soon-title'>COMING SOON</h1>
                    <h2 className='movie-title'>{type === "movies" ? movie.title : movie.name}</h2>
                    <p className='movie-description'>{type==="movies" ? movie.overview : movie.tagline}</p>
                    {type === "tvShows" && 
                    <span className='episode-name'>
                      {`S${movie.next_episode_to_air.season_number}E${movie.next_episode_to_air.episode_number} "${movie.next_episode_to_air.name}"`}
                    </span>}
                    <span className='release-date'>Release date: {type === "movies" ? movie.release_date : movie.next_episode_to_air.air_date}</span>
                    
                </div>
                <img 
                  key={movie.id}
                  onClick={() => onClick(movie.id)} 
                  alt={movie.title || movie.name} 
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                  className={slide === idx ? 'movie-photo' : 'movie-photo movie-photo-hidden' }
                  style={{
                    cursor: 'pointer'
                  }}
                />
              </div>
            )
        })}
        <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide}/>
        <span className='indicators'>
          {movies.map((_, idx) => {
            return (
              <button 
                className={slide === idx ? 'indicator' : 'indicator indicator-inactive'} 
                key={idx} 
                onClick={() => setSlide(idx)}>
              </button>
            )
          })}
        </span>
    </div>
  )
}

