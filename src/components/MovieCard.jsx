import React from 'react'

export default function MovieCard({ movie, onClick, type }) {
  return (
    <div className='single-movie-container'onClick={() => onClick(movie.id)} >
      {movie.poster_path ? (
        <img className="poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} Plakat`} />
    ) : (
        <img className='poster' src="https://www.movienewz.com/img/films/poster-holder.jpg" alt='Plakat niedostępny'/>
    )}
    <b className='title'>{type === 'movie' ? movie.title : movie.name}</b>
    </div>
  )
}
