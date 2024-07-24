import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Genres from '../Genres'
import {TrailerPopup, TvEpisodePopup} from '../PopupComponents'
import YouTube from 'react-youtube'
import './TvShowInfoPage.css'
import noImage from '../../lib/no-image-season.png'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function TvShowInfoPage() {
    const { id } = useParams()
    const [tvDetails, setTvDetails] = useState()
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [seasonDetails, setSeasonDetails] = useState()
    const [credits, setCredits] = useState([])
    const [recommendations, setRecommendations] = useState()
    const [showPopup, setShowPopup] = useState(false)
    const [showEpisodePopup, setShowEpisodePopup] = useState(false)
    const [episodeNumber, setEpisodeNumber] = useState()
    const [episodeDetails, setEpisodeDetails] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&append_to_response=videos`)
          .then((res) => res.json())
          .then((data) => setTvDetails(data))  

        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
          .then((res) => res.json())
          .then((data) => setCredits(data.cast))  

        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
          .then(res => res.json())
          .then(data => setRecommendations(data.results))
           
    }, [id])

    useEffect(() => {
        const fetchSeasonDetails = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
                const data = await res.json()
                setSeasonDetails(data)
            } catch(error) {
                console.error("Error fetching data", error)
            }
        }
        fetchSeasonDetails()
    }, [seasonNumber, id])

    useEffect(() => {
        const fetchEpisodeDetails = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
                const data = await res.json()
                setEpisodeDetails(data)
            } catch(error) {
                console.error("Error fetchhing data", error)
            }
        }

        if (episodeNumber) {
            fetchEpisodeDetails()
        }
    }, [episodeNumber])

    console.log(tvDetails)
    console.log(seasonDetails)
    console.log(episodeDetails)

    const castElements = credits?.map(actor => (
        <div className='cast-card'>
            <img className="actor-photo" alt={`${actor.name} profile photo`} src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
            <span className='actor-name'>{actor.name}</span>
            <span className='played-character-text'>{actor.character}</span>
        </div>
    ))

    const recommendationElements = recommendations?.map(show => (
        <div className='cast-card' onClick={() => handleClick(show.id)}>
            <img className="actor-photo" src={show.poster_path ? `https://image.tmdb.org/t/p/original/${show.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} alt={`${show.name} Plakat`} />
            <span>{show.name}</span>
        </div>
    ))

    const episodeGuestStars = episodeDetails?.guest_stars?.map(star => (
        <div className='cast-card' key={star.id}>
            <img className="actor-photo" src={star.profile_path ? `https://image.tmdb.org/t/p/original/${star.profile_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} alt={`${star.name} Plakat`} />
            <span>{star.name}</span>
            <span className='played-character-text'>{star.character}</span>
        </div>
    ))


    console.log(episodeNumber)
    const trailerId = tvDetails?.videos?.results[tvDetails.videos.results.length - 1]?.key

    const responsive = {
        0: { items: 1 },
        568: { items: 5 },
        1024: { items: 8 },
    };

    function handleOpenTrailer() {
        setShowPopup(true)
    }

    function handleCloseTrailer() {
        setShowPopup(false)
    }

    function handleOpenEpisode() {
        setShowEpisodePopup(true)
    }

    function handleCloseEpisode() {
        setShowEpisodePopup(false)
    }

    function handleClick(id) {
        navigate(`/tvshows/${id}`)
        window.scroll(0,0)
    }


    const renderNextButton = ({ isDisabled }) => {
        return <ArrowForwardIosIcon style={{ position: "absolute", right: -15, top: 65 }} />
      };
    
    const renderPrevButton = ({ isDisabled }) => {
        return <ArrowBackIosIcon style={{ position: "absolute", left: -15, top: 65 }} />
      };
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
                            {seasonDetails && seasonDetails.episodes?.map(episode => {
                                return (
                                    <div key={episode.id} className='episode-card'>
                                        <img 
                                            className='episode_photo'
                                            alt={episode.name}
                                            onClick={() => {
                                                setEpisodeNumber(episode.episode_number)
                                                handleOpenEpisode()
                                            }}
                                            src={episode.still_path ? `https://image.tmdb.org/t/p/original/${episode.still_path}`: noImage} 
                                        />
                                        <span>{`${episode.episode_number}. ${episode.name}`}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <TvEpisodePopup trigger={showEpisodePopup} onClick={handleCloseEpisode}>
                        {episodeDetails && (
                            <div>
                                <div className='movie-info-container'>
                                    <img className='episode-photo-popup' src={episodeDetails.still_path ? `https://image.tmdb.org/t/p/original/${episodeDetails.still_path}`: noImage} />
                                    <div className='episoe-details-container'>
                                        <span className='title-text'>{episodeDetails.name}</span>
                                        <span className='movie-details-small'>{`${episodeDetails.air_date} | ${episodeDetails.runtime} min | S${episodeDetails.season_number}E${episodeDetails.episode_number}`}</span> 
                                    </div>
                                </div>
                                <div className='overview-container'>
                                    <span>OVERVIEW</span>
                                    <p>{episodeDetails.overview}</p>   
                                </div>  
                                <div className='cast-recommendation-container overview-container'>
                                    <span>GUEST STARS</span>
                                    <div className='cast-container'>
                                        <AliceCarousel 
                                            responsive={responsive}
                                            disableDotsControls
                                            mouseTracking
                                            items={episodeGuestStars}
                                            keyboardNavigation
                                            infinite
                                            controlsStrategy='responsive'
                                            renderPrevButton={renderPrevButton}
                                            renderNextButton={renderNextButton}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </TvEpisodePopup>
                    {credits.length > 0 &&
                    <div className='cast-recommendation-container overview-container'>
                        <span>CAST</span>
                        <div className='cast-container'>
                            <AliceCarousel
                                responsive={responsive} 
                                disableDotsControls 
                                mouseTracking 
                                keyboardNavigation
                                infinite
                                controlsStrategy='responsive'
                                items={castElements}
                                renderPrevButton={renderPrevButton}
                                renderNextButton={renderNextButton}
                            />
                        </div>
                    </div>}
                    {recommendations && recommendations.length > 0 && 
                    <div className='cast-recommendation-container overview-container'>
                        <span>RECOMMENDED MOVIES</span>
                        <div className='cast-container'>
                            <AliceCarousel 
                                responsive={responsive}
                                disableDotsControls
                                mouseTracking
                                items={recommendationElements}
                                keyboardNavigation
                                infinite
                                controlsStrategy='responsive'
                                renderPrevButton={renderPrevButton}
                                renderNextButton={renderNextButton}
                            />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )}
</>
  )
}

