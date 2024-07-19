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
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/tvshows/genres/:genre" element={<CategoryPage />} />
          <Route path="/tvshows/countries/:country" element={<CategoryPage />} />
          <Route path="/tvshows/years/:year" element={<CategoryPage />} />
          <Route path="/tvshows/ratings/:rating" element={<CategoryPage />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Router>
    </SelectedItemProvider>
  )
}


export default App
