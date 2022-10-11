import { Grid, MenuItem, Pagination, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import AnimeCard from './animeCard';
import FormControl from '@mui/material/FormControl';
export default function Home() {
  const [filters,setFilter] = useState([0]);
  const [pages,setPage] = useState();
  const [animes,setAnimes] = useState([]);
  const [genres, setGenre] = useState('');
  useEffect(() => {
    
    fetchAnimes();
    filterAnimes();
    },[]);
  let movies;
  const fetchAnimes = async () => {
    const data=await fetch("https://api.jikan.moe/v4/anime");
    movies=await data.json();
    setAnimes(movies.data);
    movies.pagination ? setPage(movies.pagination.last_visible_page) : "";
    
    }; 
    
  const searchAnimes = async () => {
    let val= document.getElementById("searchAnime").value
    const data=await fetch("https://api.jikan.moe/v4/anime?q="+val);
    movies=await data.json();
    setAnimes(movies.data)
    }; 
  const filterAnimes = async () => {
    const data=await fetch("https://api.c.moe/v4/genres/anime");
    let filter=await data.json();
    setFilter(filter.data)
    }; 
      
  const handleChange = async(event) => {
    setGenre(event.target.value);
    const data=await fetch("https://api.jikan.moe/v4/anime?genres="+event.target.value);
    movies=await data.json();
    setAnimes(movies.data)
    };
  const changePage= async(event,value)=>{
    const data=await fetch("https://api.jikan.moe/v4/anime?page="+value);
    movies=await data.json();
    setAnimes(movies.data)
    }
        
  return (
    <div>
      <Grid container  sx={{ p:2}}>                 
        <Grid item xs={6} >
          <TextField id="searchAnime" label="Outlined" variant="outlined" placeholder ='search'  size="small"/>
          <button onClick={searchAnimes}>search</button>
          
        </Grid>    
        <Grid item xs={6}>
          {filters ?
          <FormControl  sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Anime Genre</InputLabel>
          <Select
          labelId="demo-simple-select-label"                
          id="demo-simple-select"
          value={genres}
          label="AnimeGenre"
          onChange={handleChange}
          >
            {filters.map(elem => (            
            <MenuItem  key={elem.mal_id} value={elem.mal_id}>{elem.name}</MenuItem>   
            )) }          
            
          </Select>
          </FormControl> 
          : ""}
               
        </Grid>
      </Grid>
      <Grid container  sx={{ p:1}}>
        <Grid item xs={9}>
          <Pagination  sx={{ p:1}} count={pages} onChange={changePage}/>
          <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          >
          {animes ?  animes.map(elem => (
             <Grid item xs={12} sm={6} md={3} key={animes.indexOf(elem)} draggable >
                 <AnimeCard movie={elem}/> 
             </Grid>
          )) : "No Result Found"}
          </Grid>
        </Grid>
        <Grid item xs={3}> Watchs</Grid>
      </Grid>
    </div>
  );
}

