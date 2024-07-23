import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Genres from '../Genres'
import TrailerPopup from '../TrailerPopup'
import YouTube from 'react-youtube'
import './TvShowInfoPage.css'
import noImage from '../../lib/no-image-season.png'

export default function TvShowInfoPage() {
    const { id } = useParams()
    const [tvDetails, setTvDetails] = useState()
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [seasonDetails, setSeasonDetails] = useState()
    const [showPopup, setShowPopup] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&append_to_response=videos`)
          .then((res) => res.json())
          .then((data) => {
            setTvDetails(data)
            // setSeasonNumber(data.seasons[0].season_number)
        })    
    }, [])

    useEffect(() => {
        const fetchSeasonDetails = async () => {
            // if (seasonNumber !== null) {
                try {
                    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
                    const data = await res.json()
                    setSeasonDetails(data)
                } catch(error) {
                    console.error("Error fetching data", error)
                }
            
        }
        fetchSeasonDetails()
    }, [seasonNumber])

    console.log(tvDetails)
    console.log(seasonDetails)

    const trailerId = tvDetails?.videos?.results[tvDetails.videos.results.length - 1]?.key

    function handleOpenTrailer() {
        setShowPopup(true)
    }

    function handleCloseTrailer() {
        setShowPopup(false)
    }

  return (
    <>
    {tvDetails && (
        <div>
            <div className='backdrop-poster-container'>
                <button 
                    className='back-button'
                    onClick={() => navigate("/tvshows")}
                    >&lt; BACK TO TV SHOWS
                </button>
                <img alt={tvDetails.name} src={`https://image.tmdb.org/t/p/original/${tvDetails.backdrop_path}`} className='backdrop-poster'/>
                {trailerId && <button className='watch-trailer-btn' onClick={handleOpenTrailer}>
                    WATCH TRAILER
                </button>}
                <div className='average-votes-container'>
                    <div className='votes-box'>
                        {tvDetails.vote_average}
                    </div>
                    <span>Average votes</span>
                </div>
            </div>
            <div className='info-container'>
                <div className='left-column-show-container'>
                    <div className='movie-info-container'>
                        <img className='movie-poster' alt={tvDetails.name} src={tvDetails.poster_path ? `https://image.tmdb.org/t/p/original/${tvDetails.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
                        <div className='title-genres-container'>
                            <span className='title-text'>{tvDetails.name}</span>
                            <div className='genres-container'>
                                <Genres id={tvDetails.id} type='show' />
                            </div>    
                            <span className='movie-details-small'>{`${tvDetails.first_air_date.substring(0,4)} - ${!tvDetails.in_production ? tvDetails.last_air_date.substring(0,4) : ''} | ${tvDetails.number_of_seasons} seasons | ${tvDetails.in_production ? 'Ongoing' : 'Ended'}`}</span> 
                        </div>
                    </div>
                    <TrailerPopup trigger={showPopup} onClick={handleCloseTrailer}>
                        <YouTube videoId={trailerId} />
                    </TrailerPopup>
                    <div className='overview-container'>
                        <span>OVERVIEW</span>
                        <p>{tvDetails.overview}</p>   
                    </div>  
                    <div className='season-container'>
                    <div className='dropdown-container tv-dropdown'>
                        <select onChange={(e) => {
                            e.preventDefault()
                            setSeasonNumber(e.target.value)
                        }}>
                            {tvDetails.seasons.filter(season => season.season_number !== 0).map(season => {
                                return <option key={season.id} value={season.season_number}>{season.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='episodes-container'>
                        {seasonDetails && seasonDetails.episodes.map(episode => {
                            return (
                                <div className='episode-card'>
                                    <img 
                                        className='episode_photo'
                                        alt={episode.name}
                                        src={episode.still_path ? `https://image.tmdb.org/t/p/original/${episode.still_path}`: noImage} 
                                    />
                                    <span>{`${episode.episode_number}. ${episode.name}`}</span>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )}
</>
  )
}

