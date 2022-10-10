
// import '../styles/globals.css';
import { Grid, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import AnimeCard from './animeCard';
import Movie from './Movie';
// import { makeStyles } from '@material-ui/core/styles/MuiThemeProvider'

export default function Home() {
  const [filters,setFilter] = useState([]);
  const [animes,setAnimes] = useState([]);
  const [genres, setGenre] = useState('');
  useEffect(() => {
    
    fetchAnimes();
    
    },[]);
let movies;
  const fetchAnimes = async () => {
    const data=await fetch("https://api.jikan.moe/v4/anime");
     movies=await data.json();
    setAnimes(movies.data);
    filterAnimes();
    }; 
    
    const searchAnimes = async () => {
     let val= document.getElementById("searchAnime").value
    const data=await fetch("https://api.jikan.moe/v4/anime?q="+val);
    movies=await data.json();
    setAnimes(movies.data)
      }; 
      const filterAnimes = async () => {
        const data=await fetch("https://api.jikan.moe/v4/genres/anime");
       let filter=await data.json();
       setFilter(filter.data)
       console.log(filters)
         }; 
      
         const handleChange = async(event) => {
          setGenre(event.target.value);
          const data= fetch("https://api.jikan.moe/v4/anime?genres="+genres);
    movies=await data.json();
    setAnimes(movies.data)
        };
      
        
    return (
     <div>                  
      <div>
        <input id = "searchAnime" type ="text" placeholder ='search' />
        <button onClick={searchAnimes}>search</button>
       </div>
      <Select
      labelId="demo-simple-select-label"                
      id="demo-simple-select"
          value={genres}
          label="AnimeGenre"
          onChange={handleChange}
        >
          <MenuItem value="0">Select</MenuItem>
          {filters ? filters.map(elem => (
            
          <MenuItem  key={elem.mal_id} value={elem.mal_id}>{elem.name}</MenuItem>   
         )) : <MenuItem value="0">No Item</MenuItem>}
          
          
        </Select>
     <Grid
         container
         spacing={2}
         direction="row"
         justify="flex-start"
         alignItems="flex-start"
     >
        {animes ?  animes.map(elem => (
             <Grid item xs={12} sm={6} md={3} key={animes.indexOf(elem)}>
                 <AnimeCard movie={elem}/> 
              </Grid>
         )) : "No Result Found"}
     </Grid>
 </div>
  );
}

