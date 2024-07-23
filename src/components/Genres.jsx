import React, { useEffect, useState } from 'react'

export default function Genres({id, type}) {
    const [genres, setGenres] = useState([])

    useEffect(() => {

      const fetchGenres = async () => {
        let url = ''
        if (type === 'movie') {
          url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
        } else if (type === 'show') {
          url = `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
        }

        try {
          const res = await fetch(url)
          const data = await res.json()
          setGenres(data.genres)
        } catch(error) {
          console.error("Error fetching data", error)
        }

        
      }
      
      fetchGenres()

      // const data = await
      //   fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
      //       .then((res) => res.json())
      //       .then((data) => setGenres(data.genres))
    }, [id])

  return (
    <>
      {genres && genres.map(genre => (
        <div key={genre.id} className='genre-name'>{genre.name}</div>
      ))}
    </>
  )
}
