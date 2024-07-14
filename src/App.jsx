import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Home from './components/Home'
import TvShows from './components/TvShows'
import Library from './components/Library'

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  )
}

export default App
