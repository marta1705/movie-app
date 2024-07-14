import React, { useState } from 'react'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'

export default function MovieCardCarousel({movies}) {
  const [slide, setSlide] = useState(0)

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
            return <img key={movie.id} alt={movie.title} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className={slide === idx ? 'movie-photo' : 'movie-photo movie-photo-hidden' }/>
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

