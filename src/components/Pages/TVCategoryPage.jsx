import React, { useContext, useEffect, useState } from 'react'
import { SelectedItemContext } from '../SelectedItemContext'
import { useNavigate } from 'react-router-dom'
import CardCarouselCategory from '../CardCarouselCategory'
import MovieCard from '../MovieCard'
import PaginationComponent from '../PaginationComponent'

export default function TVCategoryPage() {
    const {selectedItem} = useContext(SelectedItemContext)
    console.log(selectedItem)

    const [bestTV, setBestTV] = useState([])
    const [allTVs, setAllTVs] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const date = new Date()
    const day = ('0' + date.getDate()).slice(-2)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    const correctDate = `${year}-${month}-${day}`

    useEffect(() => {
      const fetchBestTVs = async () => {
        let url = ''

        if (selectedItem.category === "Genres") {
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=8&vote_average.lte=10&vote_count.gte=500&with_genres=${selectedItem.id}`
            
        } else if (selectedItem.category === "Years") {
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=500&first_air_date_year=${selectedItem.name}`
          
        } else if (selectedItem.category === "Countries") {
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=8&vote_average.lte=10&vote_count.gte=500&with_origin_country=${selectedItem.iso_3166_1}`
        } else if (selectedItem.category === "Ratings") {
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${selectedItem.values.min}&vote_average.lte=${selectedItem.values.max}&vote_count.gte=500&first_air_date.lte=${correctDate}`
        }

        try {
          const res = await fetch(url)
          const data = await res.json()

          if(data.results.length === 0) {
            if (selectedItem.category === "Genres") {
              url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${selectedItem.id}`
            } else if (selectedItem.category === "Years") {
              url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&first_air_date_year=${selectedItem.name}`
            } else if (selectedItem.category === "Countries") {
              url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=${selectedItem.iso_3166_1}`
            } else if (selectedItem.category === "Ratings") {
              url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${selectedItem.values.min}&vote_average.lte=${selectedItem.values.max}&vote_count.gte=5&first_air_date.lte=${correctDate}`
            }

            const fallbackRes = await fetch(url)
            const fallbackData = await fallbackRes.json()

            setBestTV(fallbackData.results)
          } else {
            setBestTV(data.results)
          }

          
        } catch(error) {
          console.error("error fetching tv shows", error)
        }
      }

      fetchBestTVs()

    }, [])

    useEffect(() => {
        if (selectedItem.category === "Genres") {
          fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedItem.id}`)
            .then((res) => res.json())
            .then((data) => {
              setAllTVs(data.results)
              setNumOfPages(data.total_pages)
            })
        } else if (selectedItem.category === "Years") {
          fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&first_air_date_year=${selectedItem.name}`)
            .then((res) => res.json())
            .then((data) => {
              setAllTVs(data.results)
              setNumOfPages(data.total_pages)
            })
        } else if (selectedItem.category === "Countries") {
          fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_origin_country=${selectedItem.iso_3166_1}`)
            .then((res) => res.json())
            .then((data) => {
              setAllTVs(data.results)
              setNumOfPages(data.total_pages)
            })
        } else if (selectedItem.category === "Ratings") {
          fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=${selectedItem.values.min}&vote_average.lte=${selectedItem.values.max}&page=${page}&first_air_date.lte=${correctDate}`)
            .then((res) => res.json())
            .then((data) => {
              setAllTVs(data.results)
              setNumOfPages(data.total_pages)
            })
        }
        
    }, [page]);

    console.log(bestTV)
    const bestTVsWithPoster = bestTV.filter(tv => tv.backdrop_path != null)

    function handleClick(id) {
        navigate(`/tvshows/${id}`)
    }

  return (
    <div>
        {bestTV.length > 0 && <CardCarouselCategory movies={bestTVsWithPoster} type="show" category={selectedItem.category === "Countries" ? selectedItem.english_name : selectedItem.name} onClick={handleClick}/>}
        <div className="main-container">
        <span>ALL {selectedItem.category === "Countries" ? selectedItem.english_name : selectedItem.name} TV SHOWS</span>
        <div className='popular-movies-container'>
              {allTVs && allTVs.map(tv => (
                <MovieCard key={tv.id} movie={tv} onClick={handleClick} type="show" />
              ))}
        </div>
      </div>
        {numOfPages > 1 &&
          <PaginationComponent setPage={setPage} currentPage={page} numOfPages={numOfPages > 500 ? 500 : numOfPages} />}
    </div>
  )
}

