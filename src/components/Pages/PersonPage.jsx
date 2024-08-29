import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PersonPage() {
    const { id } = useParams()
    const [ personDetails, setPersonDetails] = useState()
    const [ movieCredits, setMovieCredits] = useState()
    const [tvCredits, setTvCredits] =useState()
    const [crewCredits, setCrewCredits] = useState()
    const [allCredits, setAllCredits] = useState()
    const [value, setValue] = useState("9")
    const [creditsToShow, setCreditsToShow] = useState(10)
    const navigate = useNavigate()    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => setPersonDetails(data))

        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => setMovieCredits(data))

        fetch(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => setTvCredits(data))

        fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setCrewCredits(data.crew)
            setAllCredits(data)
        })
    }, [id])

    useEffect(() => {
        setCreditsToShow(10)
    }, [value])

    console.log(allCredits)

    movieCredits?.cast?.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });

    tvCredits?.cast?.sort((a,b) => {
        return new Date(b.first_air_date) - new Date(a.first_air_date)}
    )

    crewCredits?.sort((a,b) => {
        const dateA = new Date(a.release_date || a.first_air_date)
        const dateB = new Date(b.release_date || b.first_air_date)

        return dateB - dateA
    })

    allCredits?.cast.sort((a,b) => {
        const dateA = new Date(a.release_date || a.first_air_date)
        const dateB = new Date(b.release_date || b.first_air_date)

        return dateB - dateA
    })

    allCredits?.crew.sort((a,b) => {
        const dateA = new Date(a.release_date || a.first_air_date)
        const dateB = new Date(b.release_date || b.first_air_date)

        return dateB - dateA
    })


    const allCreditsSorted = allCredits?.cast.concat(allCredits?.crew)

    console.log(allCreditsSorted)

    const producerCredits = crewCredits?.filter(person => person.department.toLowerCase().includes("production"))
    const writerCredits = crewCredits?.filter(person => person.department.toLowerCase().includes("writing"))
    const directorCredits = crewCredits?.filter(person => person.department.toLowerCase().includes("directing"))
    const soundCredits = crewCredits?.filter(person => person.department.toLowerCase().includes("sound"))
    const visualCredits = crewCredits?.filter(person => person.department.toLowerCase().includes("visual"))
    const departments = ['production', 'writing', 'directing', 'sound', 'visual']
    const otherCredits = crewCredits?.filter(person => {
        const department = person.department.toLowerCase()

        return !departments.includes(department)
    })
    
    console.log(writerCredits)
    function handleClick(id) {
        navigate(`/movies/${id}`)
    }

    function handleTVClick(id) {
        navigate(`/tvshows/${id}`)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleLoadMore = () => {
        setCreditsToShow((prev) => prev + 10)
    }

  return (
    personDetails && (<div className='left-column-movie-container'>
            <div className='movie-info-container'>
                <img className='movie-poster' alt={personDetails.name} src={personDetails.profile_path ? `https://image.tmdb.org/t/p/original/${personDetails.profile_path}`: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
                <div className='title-genres-container'>
                    <span className='title-text'>{personDetails.name}</span>   
                    {personDetails.birthday && <span className='person-details'>Born {personDetails.birthday}</span>} 
                </div>
            </div>
            <div className='overview-container'>
                {personDetails.biography && <span>BIOGRAPHY</span>}
                <p>{personDetails.biography}</p>
                <span>FILMOGRAPHY</span>
                <TabContext value={value}>
                <Box >
                    <TabList onChange={handleChange}
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
                        {movieCredits && movieCredits.cast.length > 0 && <Tab label='Movies' value="1" />}
                        {tvCredits && tvCredits.cast.length > 0 && <Tab label="Tv Shows" value="2" />}
                        {producerCredits && producerCredits.length > 0 && <Tab label="Producer" value="3" />}
                        {writerCredits && writerCredits.length > 0 && <Tab label="Writer" value="4" />}
                        {directorCredits && directorCredits.length > 0 && <Tab label="Director" value="5" />}
                        {soundCredits && soundCredits.length > 0 && <Tab label="Composer" value="6" />}
                        {otherCredits && otherCredits.length > 0 && <Tab label="other departments" value="7" />}
                        {visualCredits && visualCredits.length > 0 && <Tab label="Visual effects" value="8" />}
                        {allCreditsSorted && allCreditsSorted.length > 0 && <Tab label="All credits" value="9" />}
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {movieCredits && movieCredits.cast.length > 0 && movieCredits.cast.slice(0, creditsToShow).map(movie => (
                        <div className='person-movie-container' >
                            <img 
                                className="actor-photo-credits" 
                                style={{width: '80px'}} 
                                alt={`${movie.title}`} 
                                onClick={() => handleClick(movie.id)}
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                            />
                            <div className='person-movie-details'>
                                <h3>{movie.title}</h3>
                                <span className='person-movie-info'>{movie.character}</span>
                                <span className='person-movie-info-date'>{movie.release_date}</span>
                            </div>
                        </div>
                    ))}
                </TabPanel>
                <TabPanel value="2">
                    {tvCredits && tvCredits.cast.length > 0 && tvCredits.cast.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.name}`} 
                                    onClick={() => handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.name}</h3>
                                    <span className='person-movie-info'>{movie.character}</span>
                                    <span className='person-movie-info-date'>{movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="3">
                    {producerCredits && producerCredits.length > 0 && producerCredits.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="4">
                    {writerCredits && writerCredits.length > 0 && writerCredits.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="5">
                    {directorCredits && directorCredits.length > 0 && directorCredits.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="6">
                    {soundCredits && soundCredits.length > 0 && soundCredits.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="7">
                    {otherCredits && otherCredits.length > 0 && otherCredits.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="8">
                    {visualCredits && visualCredits.length > 0 && visualCredits.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                <TabPanel value="9">
                    {allCreditsSorted && allCreditsSorted.length > 0 && allCreditsSorted.slice(0, creditsToShow).map(movie => (
                            <div className='person-movie-container' >
                                <img 
                                    className="actor-photo-credits" 
                                    style={{width: '80px'}} 
                                    alt={`${movie.media_type === "movie" ? movie.title : movie.name}`} 
                                    onClick={() => movie.media_type === "movie" ? handleClick(movie.id) : handleTVClick(movie.id)}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'}
                                />
                                <div className='person-movie-details'>
                                    <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
                                    <span className='person-movie-info'>{movie.job}</span>
                                    <span className='person-movie-info-date'>{movie.media_type === "movie" ? movie.release_date : movie.first_air_date}</span>
                                </div>
                            </div>
                        ))}
                </TabPanel>
                </TabContext>
                <button className='load-more-btn' style={{margin: 10}} onClick={handleLoadMore}>Load More</button>
            </div>
    </div>)
  )
}


