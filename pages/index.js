
// import '../styles/globals.css';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import AnimeCard from './animeCard';
import Movie from './Movie';
// import { makeStyles } from '@material-ui/core/styles/MuiThemeProvider'

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

    const searchAnimes = async () => {
      const data=await fetch("https://api.jikan.moe/v4/anime/q?'beet'");
      const searchedMovies=await data.json();
    
      setAnimes(searchedMovies.data);
      }; 
  





    return (
      
     <div>
      <div>
        <input type="text" placeholder='Search' />
        <button onClick={searchAnimes()}>submit</button>      
      </div>
      <select 
      // onChange={(e) => {
      //   setFilterParm(e.target.value)
      // }}
      className ="select">
      <option value = "All"> Filter by genres</option>
      <option value = "Aabcll">  by genres</option>

   
      </select>
      
     <Grid
         container
         spacing={2}
         direction="row"
         justify="flex-start"
         alignItems="flex-start"
     >
         {animes.map(elem => (
             <Grid item xs={12} sm={6} md={3} key={animes.indexOf(elem)}>
                 <AnimeCard movie={elem}/> 
              </Grid>
         ))}
     </Grid>
 </div>
  );
}

