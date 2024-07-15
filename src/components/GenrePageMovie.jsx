import React, { useContext, useEffect, useState } from 'react'
import { SelectedItemContext } from './SelectedItemContext'
import CardCarouselCategory from './CardCarouselCategory'

export default function GenrePageMovie() {
    const { selectedItem } = useContext(SelectedItemContext)
    const [bestMovies, setBestMovies] = useState([])
    const [movies, setMovies] = useState([])
    console.log(selectedItem)

    
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=8&vote_average.lte=10&vote_count.gte=1000&with_genres=${selectedItem.id}`)
      .then((res) => res.json())
      .then((data) =>setBestMovies(data.results))
    }, []);

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/38?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => { 
        setMovies(data);
    })
  },[]);

  console.log(movies)

  return (
    <div>
      <CardCarouselCategory movies={bestMovies} type="movies" category={selectedItem.name}/>
    </div>
  )
}

