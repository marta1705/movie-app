import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  return (
    <header>
        <div className='header-container'>
            <div className='app-name'>
                APP NAME
            </div>
            <div className='header-div'>
                <ol className='header-list'>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies">Movies</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tvshows">Tv Shows</NavLink>
                    </li>
                    <li>
                        <NavLink to="/library">Library</NavLink>
                    </li>
                </ol>
                <div className='search-icon-container'>
                    <SearchIcon className="search-icon" style={{color:'white', fontSize: '25px' }} />
                </div>
            </div>
        </div>
    </header>
  )
}

