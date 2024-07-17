import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Home from './components/Home'
import TvShows from './components/TvShows'
import Library from './components/Library'
import GenrePageMovie from './components/GenrePageMovie'
import CountryPageMovie from './components/CountryPageMovie'
import YearPageMovie from './components/YearPageMovie'
import RatingPageMovie from './components/RatingPageMovie'
import { SelectedItemProvider } from './components/SelectedItemContext'
import MovieInfoPage from './components/MovieInfoPage'


function App() {

  return (
    <SelectedItemProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInfoPage />} />
          <Route path="/movies/genres/:genre" element={<GenrePageMovie />} />
          <Route path="/movies/countries/:country" element={<CountryPageMovie />} />
          <Route path="/movies/years/:year" element={<YearPageMovie />} />
          <Route path="/movies/ratings/:rating" element={<RatingPageMovie />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/tvshows/genres/:genre" element={<GenrePageMovie />} />
          <Route path="/tvshows/countries/:country" element={<CountryPageMovie />} />
          <Route path="/tvshows/years/:year" element={<YearPageMovie />} />
          <Route path="/tvshows/ratings/:rating" element={<RatingPageMovie />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Router>
    </SelectedItemProvider>
  )
}


export default App
