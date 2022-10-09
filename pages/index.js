
// import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Movie from './Movie';

export default function Home() {
  const [animes,setAnimes] = useState([]);
  useEffect(() => {
    fetchAnimes();
    },[]);

  const fetchAnimes = async () => {
    const data=await fetch("https://api.jikan.moe/v4/anime");
    const movies=await data.json();
  
    setAnimes(movies.data);
    }; 

    return (
    <div className='app'>
      <div className='anime-movies'>
        { animes ?  animes.map( anime => <Movie movie={anime}/> ) : ""}
        hello
      </div>
    </div>
  );
}

