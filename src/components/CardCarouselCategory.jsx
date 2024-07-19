import React, { useState } from 'react'
import './CardCarouselCategory.css'
import Genres from './Genres'
import { useNavigate } from 'react-router-dom'

export default function CardCarouselCategory({movies, type, category, onClick}) {
    const [slide, setSlide] = useState(0)
    const navigate = useNavigate()

    function handleImageClick(id) {
      if (onClick) {
        onClick(id)
      }
    }
    return (
        <div className='carousel-card--slide'>
          <button 
            className='back-btn'
            onClick={() => navigate("/movies")}
            >&lt; BACK TO MOVIES</button>
            {movies.map((movie, idx) => {
                return (
                  <div key={movie.id} className={slide === idx ? 'carousel-card--slide-content' : 'carousel-card--slide-content carousel-photo-hidden'}>
                    <div className='carousel-card--desc'>
                      <h1 className='carousel-title'>{`Best of ${category}`}</h1>
                      <span className='carousel-path'>{`Movies / ${category}`}</span>
                      <span className='most-popular-text'>MOST POPULAR</span>
                      <div className='genres-container'>
                        <Genres id={movie.id} />
                      </div>
                      <h2 className='carousel-movie-title'>{type === "movies" ? movie.title : movie.name}</h2>
                      <div className='votes-container'>
                        <div className='box'>
                          {movie.vote_average}
                        </div>
                        <span>Average votes</span>
                      </div>
                    </div>
                    <img 
                      key={movie.id} 
                      onClick={() => handleImageClick(movie.id)}
                      alt={movie.title} 
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                      className={slide === idx ? 'carousel-photo' : 'carousel-photo carousel-photo-hidden' }
                      style={{
                        cursor: "pointer"
                      }}
                    />
                  </div>
                )
            })}
            <span className='carousel-indicators'>
              {movies.map((_, idx) => {
                return (
                  <button 
                    className={slide === idx ? 'carousel-indicator' : 'carousel-indicator carousel-indicator-inactive'} 
                    key={idx} 
                    onClick={() => setSlide(idx)}>
                  </button>
                )
              })}
            </span>
        </div>
      )
}

