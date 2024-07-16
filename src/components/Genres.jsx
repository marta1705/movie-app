import React, { useEffect, useState } from 'react'

export default function Genres({id}) {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => setGenres(data.genres))
    }, [id])

  return (
    <>
      {genres && genres.map(genre => (
        <div key={genre.id} className='genre-name'>{genre.name}</div>
      ))}
    </>
  )
}
