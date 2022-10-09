import React from 'react'

function Movie({movie}) {
  return (
    <div>
        <h1>{movie.title}</h1>
        {/* {movie ? console.log(movie) : ""} */}
        <img src = {"https://cdn.myanimelist.net/images/anime/7/20310.jpg"}></img>
      
    </div>
  )
}

export default Movie