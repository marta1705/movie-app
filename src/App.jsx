import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Movies from './components/Pages/Movies'
import Home from './components/Pages/Home'
import TvShows from './components/Pages/TvShows'
import Library from './components/Pages/Library'
import CategoryPage from './components/Pages/CategoryPage'
import { SelectedItemProvider } from './components/SelectedItemContext'
import MovieInfoPage from './components/Pages/MovieInfoPage'
import TvShowInfoPage from './components/Pages/TvShowInfoPage'
import TVCategoryPage from './components/Pages/TVCategoryPage'
import CastAndCrewPage from './components/Pages/CastAndCrewPage'
import PersonPage from './components/Pages/PersonPage'


function App() {

  return (
    <SelectedItemProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInfoPage />} />
          <Route path="/movies/genres/:genre" element={<CategoryPage />} />
          <Route path="/movies/countries/:country" element={<CategoryPage />} />
          <Route path="/movies/years/:year" element={<CategoryPage />} />
          <Route path="/movies/ratings/:rating" element={<CategoryPage />} />

          <Route exact path="/tvshows" element={<TvShows />} />
          <Route path="/tvshows/:id" element={<TvShowInfoPage />}/>
          <Route path="/tvshows/genres/:genre" element={<TVCategoryPage />} />
          <Route path="/tvshows/countries/:country" element={<TVCategoryPage />} />
          <Route path="/tvshows/years/:year" element={<TVCategoryPage />} />
          <Route path="/tvshows/ratings/:rating" element={<TVCategoryPage />} />

          <Route path="/:id/credits" element={ <CastAndCrewPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
      </Router>
    </SelectedItemProvider>
  )
}


export default App
