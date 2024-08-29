import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import './MovieInfoPage.css'
import Genres from '../Genres'
import YouTube from 'react-youtube'
import {TrailerPopup} from '../PopupComponents'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import noImage from '../../lib/no-image.png'

export default function() {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState()
    const [credits, setCredits] = useState([])
    const [allCast, setAllCast] = useState()
    const [showPopup, setShowPopup] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const [collection, setCollection] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`)
        .then(res => res.json())
        .then(data => setMovieDetails(data))

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => (
            setCredits(data.cast),
            setAllCast(data)
        ))

        
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => setRecommendations(data.results))
        
    }, [id])

    useEffect(() => {
        if (movieDetails && movieDetails.belongs_to_collection) {
          fetch(`https://api.themoviedb.org/3/collection/${movieDetails.belongs_to_collection.id}?api_key=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(data => setCollection(data));
        } else {
            setCollection([])
        }
      }, [movieDetails]);

    console.log(movieDetails)
    console.log(allCast)

    const castElements = credits?.map(actor => (
        <div className='cast-card'>
            <img 
                className="actor-photo" 
                alt={`${actor.name} profile photo`} 
                onClick={() => navigate(`/person/${actor.id}`)}
                src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} 
            />
            <span className='actor-name'>{actor.name}</span>
            <span className='played-character-text'>{actor.character}</span>
        </div>
    ))

    const recommendationElements = recommendations?.map(movie => (
        <div className='cast-card' onClick={() => handleClick(movie.id)}>
            <img className="actor-photo" src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} alt={`${movie.title} Plakat`} />
            <span>{movie.title}</span>
        </div>
    ))

    const responsive = {
        0: { items: 1 },
        568: { items: 5 },
        1024: { items: 7 },
    };

    const trailerId = movieDetails?.videos?.results[movieDetails.videos.results.length - 1]?.key

    function handleOpenTrailer() {
        setShowPopup(true)
    }

    function handleCloseTrailer() {
        setShowPopup(false)
    }

    function handleClick(id) {
        navigate(`/movies/${id}`)
        window.scroll(0,0)
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
                        {trailerId && <button className='watch-trailer-btn' onClick={handleOpenTrailer}>
                            WATCH TRAILER
                        </button>}
                        <div className='average-votes-container'>
                            <div className='votes-box'>
                                {movieDetails.vote_average}
                            </div>
                            <span>Average votes</span>
                        </div>
                    </div>
                    <div className='info-container'>
                        <div className='left-column-movie-container'>
                            <div className='movie-info-container'>
                                <img className='movie-poster' alt={movieDetails.title} src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
                                <div className='title-genres-container'>
                                    <span className='title-text'>{movieDetails.title}</span>
                                    <div className='genres-container'>
                                        <Genres id={movieDetails.id} type='movie' />
                                    </div>    
                                    <span className='movie-details-small'>{`${movieDetails.release_date} | ${movieDetails.runtime} min`}</span> 
                                </div>
                            </div>
                            <TrailerPopup trigger={showPopup} onClick={handleCloseTrailer}>
                                <YouTube videoId={trailerId} />
                            </TrailerPopup>
                            <div className='overview-container'>
                                <span>OVERVIEW</span>
                                <p>{movieDetails.overview}</p>
                                {credits.length > 0 &&
                                <>
                                    <Link to={`/${id}/credits`} style={{color: 'white'}} state={{credits: allCast}}><span>CAST & CREW</span></Link>
                                    <div className='cast-container'>
                                        <AliceCarousel 
                                            responsive={responsive} 
                                            disableDotsControls 
                                            mouseTracking 
                                            items={castElements}
                                            infinite
                                            renderPrevButton={() => {
                                                return <ArrowBackIosIcon style={{ position: "absolute", left: -10, top: 65}} />
                                            }}
                                            renderNextButton={() => {
                                                return <ArrowForwardIosIcon style={{ position: "absolute", right: -10, top: 65}} />
                                            }}
                                        />
                                    </div>
                                </>}
                                
                                {recommendations.length > 0 && 
                                <>
                                    <span>RECOMMENDED MOVIES</span>
                                    <div className='cast-container'>
                                        <AliceCarousel 
                                            responsive={responsive}
                                            disableDotsControls
                                            mouseTracking
                                            infinite
                                            items={recommendationElements}
                                            renderPrevButton={() => {
                                                return <ArrowBackIosIcon style={{ position: "absolute", left: -15, top: 65}} />
                                            }}
                                            renderNextButton={() => {
                                                return <ArrowForwardIosIcon style={{ position: "absolute", right: -15, top: 65}} />
                                            }}
                                        />
                                    </div>
                                </>}
                            </div>  
                        </div>
                        {collection && collection.parts &&
                            <div className='collection-container'>
                                <div className='collection-info-container'>
                                    <span>{collection.name}</span>
                                    <img 
                                        className='collection-photo' 
                                        src={collection.backdrop_path ? `https://image.tmdb.org/t/p/original/${collection.backdrop_path}` : noImage} 
                                        alt={collection.name}
                                    />
                                </div>
                                <span>MOVIES IN COLLECTION</span>
                                {collection.parts.map(part => (
                                    <div key={part.id} className='collection-part-container'>
                                        <img 
                                            onClick={() => handleClick(part.id)} 
                                            className='collection-movie-photo' 
                                            src={part.backdrop_path ? `https://image.tmdb.org/t/p/original/${part.backdrop_path}`: noImage}
                                            alt={part.title}
                                            />
                                        <span>{part.title}</span>
                                    </div>
                                    )) 
                                }
                            </div>
                        }
                    </div>

                </div>
            )}
        </>
    )
}
