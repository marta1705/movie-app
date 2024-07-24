import React, { useContext, useEffect, useState } from 'react'
import { SelectedItemContext } from '../SelectedItemContext'
import CardCarouselCategory from '../CardCarouselCategory'
import PaginationComponent from '../PaginationComponent'
import MovieCard from '../MovieCard'
import { useNavigate } from 'react-router-dom'

export default function CategoryPage() {
    const { selectedItem } = useContext(SelectedItemContext)
    const [bestMovies, setBestMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const date = new Date()
    const day = ('0' + date.getDate()).slice(-2)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    const correctDate = `${year}-${month}-${day}`

    useEffect(() => {
      const fetchBestMovies = async () => {
        let url = ''

        if (selectedItem.category === "Genres") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=8&vote_average.lte=10&vote_count.gte=1000&with_genres=${selectedItem.id}`
            
        } else if (selectedItem.category === "Years") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=1000&primary_release_year=${selectedItem.name}`
          
        } else if (selectedItem.category === "Countries") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=8&vote_average.lte=10&vote_count.gte=1000&with_origin_country=${selectedItem.iso_3166_1}`
        } else if (selectedItem.category === "Ratings") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${selectedItem.values.min}&vote_average.lte=${selectedItem.values.max}&vote_count.gte=1000&primary_release_date.lte=${correctDate}`
        }

        try {
          const res = await fetch(url)
          const data = await res.json()

          if(data.results.length === 0) {
            if (selectedItem.category === "Genres") {
              url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${selectedItem.id}`
            } else if (selectedItem.category === "Years") {
              url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_year=${selectedItem.name}`
            } else if (selectedItem.category === "Countries") {
              url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${selectedItem.iso_3166_1}`
            } else if (selectedItem.category === "Ratings") {
              url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${selectedItem.values.min}&vote_average.lte=${selectedItem.values.max}&vote_count.gte=5&primary_release_date.lte=${correctDate}`
            }

            const fallbackRes = await fetch(url)
            const fallbackData = await fallbackRes.json()

            setBestMovies(fallbackData.results)
            console.log(bestMovies)
            
          } else {
            setBestMovies(data.results)
          }

          
        } catch(error) {
          console.error("error fetching movies", error)
        }
      }

      fetchBestMovies()

    }, [])

    useEffect(() => {
      if (selectedItem.category === "Genres") {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedItem.id}`)
          .then((res) => res.json())
          .then((data) => {
            setAllMovies(data.results)
            setNumOfPages(data.total_pages)
          })
      } else if (selectedItem.category === "Years") {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&primary_release_year=${selectedItem.name}`)
          .then((res) => res.json())
          .then((data) => {
            setAllMovies(data.results)
            setNumOfPages(data.total_pages)
          })
      } else if (selectedItem.category === "Countries") {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_origin_country=${selectedItem.iso_3166_1}`)
          .then((res) => res.json())
          .then((data) => {
            setAllMovies(data.results)
            setNumOfPages(data.total_pages)
          })
      } else if (selectedItem.category === "Ratings") {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${selectedItem.values.min}&vote_average.lte=${selectedItem.values.max}&page=${page}&primary_release_date.lte=${correctDate}`)
          .then((res) => res.json())
          .then((data) => {
            setAllMovies(data.results)
            setNumOfPages(data.total_pages)
          })
      }
      
  }, [page]);

  function handleClick(id) {
    navigate(`/movies/${id}`)
  }

 // console.log(bestMovies)
  console.log(allMovies)

  const bestMoviesWithPoster = bestMovies.filter(movie => movie.backdrop_path != null)

  return (
    <div>
      {bestMovies.length > 0 && <CardCarouselCategory movies={bestMoviesWithPoster} type="movies" category={selectedItem.category === "Countries" ? selectedItem.english_name : selectedItem.name} onClick={handleClick}/>}
      <div className="main-container">
        <span>ALL {selectedItem.category === "Countries" ? selectedItem.english_name : selectedItem.name} MOVIES</span>
        <div className='popular-movies-container'>
              {allMovies && allMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={handleClick} type="movie" />
              ))}
        </div>
      </div>
        {numOfPages > 1 &&
          <PaginationComponent setPage={setPage} currentPage={page} numOfPages={numOfPages > 500 ? 500 : numOfPages} />}
    </div>
  )
}

