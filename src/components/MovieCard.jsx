import React from 'react'

export default function MovieCard({movie, imgBase, onSelect, onFav, isFav}){
  const img = movie.poster_path ? imgBase + movie.poster_path : ''
  return (
    <article className="card" onClick={onSelect} tabIndex={0}>
      {img ? <img src={img} alt={movie.title} /> : <div className="noimg">No image</div>}
      <div className="meta">
        <h3>{movie.title}</h3>
        <div className="row">
          <small>{(movie.release_date||'').slice(0,4)}</small>
          <small>⭐ {movie.vote_average}</small>
        </div>
        <p className="overview">{movie.overview}</p>
        <div className="actions">
          <button onClick={(e)=>{ e.stopPropagation(); onFav(movie) }}>{isFav? 'Remove' : 'Fav'}</button>
        </div>
      </div>
    </article>
  )
}
