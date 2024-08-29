import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Tab, ThemeProvider } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function CastAndCrewPage() {
    window.scroll(0,0)
    const navigate = useNavigate()
    const location = useLocation()
    const {credits, type} = location.state
    const [movieDetails, setMovieDetails] = useState()
    const [tvDetails, setTvDetails] = useState()
    const [value, setValue] = useState('1')

    useEffect(() => {
        if (type === 'tv') {
            fetch(`https://api.themoviedb.org/3/tv/${credits.id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`)
            .then(res => res.json())
            .then(data => setTvDetails(data))
        } else {
            fetch(`https://api.themoviedb.org/3/movie/${credits.id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`)
            .then(res => res.json())
            .then(data => setMovieDetails(data))
        }
    }, [])

    console.log(tvDetails)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function handleClick(id) {
        navigate(`/person/${id}`)
    }

    console.log(credits)

    const exists = movieDetails || tvDetails

    let source = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
    if (type === 'tv') {
        source = tvDetails?.poster_path ? `https://image.tmdb.org/t/p/original/${tvDetails.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
    } else {
        source = movieDetails?.poster_path ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
    }

  return (
    <div>
        {exists && <div className='movie-info-container'>
            <img className='movie-poster' style={{width: 100}} alt={type === 'tv' ? tvDetails.name : movieDetails.title} src={source} />
            <div className='title-genres-container'>
                <span className='title-text'>{type === 'tv' ? tvDetails.name : movieDetails.title}</span>
                <span className='movie-details-small' style={{fontSize: 17}}>FULL CAST & CREW</span>
            </div>
        </div>}
        <div>
            <TabContext value={value}>
                <Box >
                    <TabList onChange={handleChange} centered 
                        sx={{
                            "& .MuiTab-root": {
                                color: "white",
                            },
                            "& .Mui-selected": {
                                color: "white", // Selected tab color
                            },
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#39ACE7", // Active tab underline color
                            }
                        }}
                    >
                        <Tab style={{width: "50%"}} label="Cast" value="1" />
                        <Tab style={{width: "50%"}} label="Crew" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className='credits-container'>
                        {credits.cast.length > 0 && credits.cast.map(actor => (
                            <div className='cast-card-credits'>
                                <img className="actor-photo-credits" alt={`${actor.name} profile photo`} src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
                                <span className='actor-name'>{actor.name}</span>
                                <span className='played-character-text'>{actor.character}</span>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='credits-container'>
                        {credits.crew.length > 0 && credits.crew.map(actor => (
                            <div className='cast-card-credits'>
                                <img className="actor-photo-credits" onClick={() => handleClick(actor.id)} alt={`${actor.name} profile photo`} src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
                                <span className='actor-name'>{actor.name}</span>
                                <span className='played-character-text'>{actor.department}</span>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    </div>
  )
}


