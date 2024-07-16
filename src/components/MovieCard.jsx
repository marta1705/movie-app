import React from 'react'

export default function MovieCard({movie}) {
  return (
    <div className='single-movie-container'>
      {movie.poster_path ? (
        <img className="poster" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`${movie.title} Plakat`} />
    ) : (
        <img className='poster' src="https://www.movienewz.com/img/films/poster-holder.jpg" alt='Plakat niedostępny'/>
    )}
    <b className='title'>{movie.title}</b>
    </div>
  )
}
