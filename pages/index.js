import { Button, Grid, MenuItem, Pagination, Select, TextField } from '@mui/material';
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
    // search
  const searchAnimes = async () => {
    let val= document.getElementById("searchAnime").value
    const data=await fetch("https://api.jikan.moe/v4/anime?q="+val);
    movies=await data.json();
    setAnimes(movies.data)
    }; 
    // filter
  const filterAnimes = async () => {
    const data=await fetch("https://api.jikan.moe/v4/genres/anime");
    let filter=await data.json();
    setFilter(filter.data)
    };  
  const hanasyncdleChange = (event) => {
    setGenre(event.target.value);
    const data=await fetch("https://api.jikan.moe/v4/anime?genres="+event.target.value);
    movies=await data.json();
    setAnimes(movies.data)
    };
    // pagination
  const changePage= async(event,value)=>{
    const data=await fetch("https://api.jikan.moe/v4/anime?page="+value);
    movies=await data.json();
    setAnimes(movies.data)
    }

    function drag(e, ev) {
      console.log('Drag Event', ev)
      e.dataTransfer.setData("text", ev);
    }

    function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      console.log(data)
      // ev.target.appendChild(document.getElementById(data));
    }
        
  return (
    <div>
      <h2>React JS Animes</h2>
      <Grid container  sx={{ p:2}}> 
        <Grid item xs={3}>
          {filters ?
          <FormControl  sx={{ minWidth: 150 }}>
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
        <Grid item xs={5} >
        <Pagination  sx={{ p:1}} count={pages} onChange={changePage}/> 
        </Grid>
        <Grid item xs={4} >
          <TextField id="searchAnime" label="search" variant="outlined" placeholder ='search'  size="small"/>
          <Button variant="outlined" sx={{ marginLeft:2}} onClick={searchAnimes}>search</Button>3
        </Grid> 
      </Grid>
      <Grid container  sx={{ p:1}}>
        <Grid item xs={9}>
          <Grid
          container
          spacing={2} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          >
          {animes ?  animes.map(elem => (
             <Grid id={elem.id} item xs={12} sm={6} md={3} key={animes.indexOf(elem)} draggable  onDragStart={(e) => drag(e, elem.title)} >
                 <AnimeCard movie={elem}/> 
             </Grid>
          )) : "No Result Found"}
          </Grid>
        </Grid>
        <Grid item onDrop={(e) => drop(e)} onDragOver={(e)=> e.preventDefault()} xs={3}><h4>WatchList</h4> </Grid>
      </Grid>
    </div>
  );
}

