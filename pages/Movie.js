import React from 'react'
import Card from './animeCard'

function Movie({movie}) {
  return (
    <div>
        <h1>{movie.title}</h1>
        {/* {movie ? console.log(movie) : ""} */}
        <img src = {movie.images.jpg.image_url}></img>
        <h3>{movie.rating}</h3>
       {/* <div className='app'>   
      <div className='anime-movies'>
        
        { animes ?  animes.map( anime => <AnimeCard movie={anime}/> ) : ""}
        
      </div>
    </div> */}
    </div>
  )
}

export default Movie