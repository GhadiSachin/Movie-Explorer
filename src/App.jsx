import React, {useEffect, useState, useRef} from 'react'
import MovieCard from './components/MovieCard'

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
const BASE = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p/w342'

function fetchMovies(path){
  return fetch(`${BASE}${path}&api_key=${TMDB_KEY}`).then(r=>r.json())
}

export default function App(){
  const [mode, setMode] = useState('trending') // trending | search | favorites
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('me:favorites')) || [] }catch{ return [] }
  })
  const qref = useRef()

  useEffect(()=> localStorage.setItem('me:favorites', JSON.stringify(favorites)), [favorites])

  async function loadTrending(p=1){
    if(!TMDB_KEY){ alert('Missing TMDB API key. Add VITE_TMDB_KEY to .env.'); return }
    setLoading(true)
    const res = await fetchMovies(`/trending/movie/week?page=${p}`)
    setMovies(prev => p===1 ? res.results : [...prev, ...(res.results||[])] )
    setPage(res.page || p)
    setTotalPages(res.total_pages || 1)
    setLoading(false)
  }

  async function doSearch(q, p=1){
    if(!TMDB_KEY){ alert('Missing TMDB API key. Add VITE_TMDB_KEY to .env.'); return }
    setLoading(true)
    const res = await fetchMovies(`/search/movie?query=${encodeURIComponent(q)}&page=${p}`)
    setMovies(prev => p===1 ? res.results : [...prev, ...(res.results||[])] )
    setPage(res.page || p)
    setTotalPages(res.total_pages || 1)
    setLoading(false)
  }

  useEffect(()=> { if(mode==='trending') loadTrending(1) }, [mode])

  function onSearch(e){
    e.preventDefault()
    if(!qref.current.value.trim()) return
    setMode('search')
    setQuery(qref.current.value.trim())
    doSearch(qref.current.value.trim(), 1)
  }

  function loadMore(){
    const next = page + 1
    if(next > totalPages) return
    if(mode === 'trending') loadTrending(next)
    else if(mode === 'search') doSearch(query, next)
  }

  function toggleFav(m){
    setFavorites(prev => {
      const exists = prev.find(x=>x.id===m.id)
      if(exists) return prev.filter(x=> x.id!==m.id)
      return [m, ...prev]
    })
  }

  return (
    <div className="app">
      <header>
        <h1>Movie Explorer 🎬</h1>
        <nav>
          <button onClick={()=> { setMode('trending'); setMovies([]) }} className={mode==='trending'?'sel':''}>Trending</button>
          <button onClick={()=> { setMode('favorites'); setMovies(favorites) }} className={mode==='favorites'?'sel':''}>Favorites ({favorites.length})</button>
        </nav>
      </header>

      <section className="controls">
        <form onSubmit={onSearch} className="search">
          <input ref={qref} placeholder="Search movies by title..." defaultValue={query} aria-label="Search movies" />
          <button type="submit">Search</button>
          <button type="button" onClick={()=> { qref.current.value=''; setMode('trending'); loadTrending(1) }}>Reset</button>
        </form>
      </section>

      <main>
        {movies.length === 0 && !loading ? <div className="empty">No movies to show.</div> : (
          <div className="grid">
            {movies.map(m => <MovieCard key={m.id} movie={m} imgBase={IMG} onSelect={()=> setSelected(m)} onFav={()=> toggleFav(m)} isFav={!!favorites.find(x=>x.id===m.id)} />)}
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}

        {page < totalPages && mode!=='favorites' && (
          <div style={{textAlign:'center', margin:18}}>
            <button onClick={loadMore} disabled={loading}>Load more</button>
          </div>
        )}
      </main>

      {selected && (
        <div className="modal" role="dialog" aria-modal="true" onClick={()=> setSelected(null)}>
          <div className="modal-card" onClick={e=>e.stopPropagation()}>
            <button className="close" onClick={()=> setSelected(null)}>Close</button>
            <h2>{selected.title} ({(selected.release_date||'').slice(0,4)})</h2>
            <div className="modal-body">
              <img src={selected.poster_path ? IMG+selected.poster_path : ''} alt="" />
              <div>
                <p><strong>Overview</strong></p>
                <p>{selected.overview || 'No overview available.'}</p>
                <p><strong>Score:</strong> {selected.vote_average} / 10</p>
                <p><strong>Popularity:</strong> {selected.popularity}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <small>Data from The Movie Database (TMDB). Provide your API key in <code>.env</code>.</small>
      </footer>
    </div>
  )
}
