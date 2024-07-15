import React, { useState } from 'react'
import './CardCarouselCategory.css'

export default function CardCarouselCategory({movies, type, category}) {
    const [slide, setSlide] = useState(0)
    return (
        <div className='carousel-card--slide'>
            {movies.map((movie, idx) => {
                return (
                  <div key={movie.id} className={slide === idx ? 'carousel-card--slide-content' : 'carousel-card--slide-content carousel-photo-hidden'}>
                    <div className='carousel-card--desc'>
                      <h1 className='carousel-title'>{`Best of ${category}`}</h1>
                        <h2 className='carousel-movie-title'>{type === "movies" ? movie.title : movie.name}</h2>
                    </div>
                    <img key={movie.id} alt={movie.title} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className={slide === idx ? 'carousel-photo' : 'carousel-photo carousel-photo-hidden' }/>
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

