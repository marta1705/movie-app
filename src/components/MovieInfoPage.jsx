import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MovieInfoPage.css'
import Genres from './Genres'
import YouTube from 'react-youtube'
import TrailerPopup from './TrailerPopup'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function() {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState()
    const [credits, setCredits] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`)
        .then(res => res.json())
        .then(data => setMovieDetails(data))

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => setCredits(data.cast))
    }, [])

    console.log(movieDetails)
    console.log(credits)

    const castElements = credits.map(actor => (
        <div className='cast-card'>
            <img className="actor-photo" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} />
            <span>{actor.name}</span>
            <span className='played-character-text'>{actor.character}</span>
        </div>
    ))

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 8 },
    };

    const trailerId = movieDetails?.videos.results[movieDetails.videos.results.length - 1].key

    function handleOpenTrailer() {
        setShowPopup(true)
    }

    function handleCloseTrailer() {
        setShowPopup(false)
    }

    return (
        <>
            {movieDetails && (
                <div>
                    
                    <div className='backdrop-poster-container'>
                        <button 
                            className='back-button'
                            onClick={() => navigate("/movies")}
                            >&lt; BACK TO MOVIES
                        </button>
                        <img alt={movieDetails.title} src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} className='backdrop-poster'/>
                        <button className='watch-trailer-btn' onClick={handleOpenTrailer}>
                            WATCH TRAILER
                        </button>
                        <div className='average-votes-container'>
                            <div className='votes-box'>
                                {movieDetails.vote_average}
                            </div>
                            <span>Average votes</span>
                        </div>
                    </div>
                    <div className='movie-info-container'>
                        <img className='movie-poster' alt={movieDetails.title} src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} />
                        <div className='title-genres-container'>
                            <span className='title-text'>{movieDetails.title}</span>
                            <div className='genres-container'>
                                <Genres id={movieDetails.id} />
                            </div>     
                        </div>
                    </div>
                    <TrailerPopup trigger={showPopup} onClick={handleCloseTrailer}>
                        <YouTube videoId={trailerId} />
                    </TrailerPopup>
                    <div className='overview-container'>
                        <span>OVERVIEW</span>
                        <p>{movieDetails.overview}</p>
                        <span>CAST</span>
                        <div className='cast-container'>
                            <AliceCarousel 
                                responsive={responsive} 
                                disableDotsControls 
                                mouseTracking 
                                items={castElements}
                                renderPrevButton={() => {
                                    return <ArrowBackIosIcon style={{ position: "absolute", left: -10, top: 65}} />
                                }}
                                renderNextButton={() => {
                                    return <ArrowForwardIosIcon style={{ position: "absolute", right: -10, top: 65}} />
                                }}
                            />
                        </div>
                    </div>  
                </div>
            )}
        </>
    )
}
