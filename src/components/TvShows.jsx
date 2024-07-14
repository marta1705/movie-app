import React, { useState, useEffect } from 'react'
import MovieCardCarousel from './MovieCardCarousel'

export default function TvShows() {
    const [tvShows, setTvShows] = useState([])

    const date = new Date()
    const day = ('0' + date.getDate()).slice(-2)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    const min_date = `${year}-${month}-${day}`
    const max_date = `${year}-${month}-${parseInt(day) + 7}`

    console.log(min_date)
    console.log(max_date)

    //`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=${max_date}&air_date.gte=${min_date}`
    //https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}
    //fetch(`https://api.themoviedb.org/3/tv/1416?api_key=${apiKey}`)
    //.then(res => res.json())
    //.then(data => console.log(data))
    useEffect(()=> {
      const apiKey = import.meta.env.VITE_API_KEY
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte${max_date}&air_date.gte=${min_date}`)
          .then((res) => res.json())
          .then((data) => setTvShows(data.results))  
    }, [])


  return (
    <div>
        <MovieCardCarousel movies={tvShows} />
    </div>

  )
}


