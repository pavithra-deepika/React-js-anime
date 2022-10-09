
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
  //   const useStyles = makeStyles(theme => ({
  //     root: {
  //         flexGrow: 1,
  //         padding: theme.spacing(2)
  //     }
  // }))
  //   const classes = useStyles()
    return (
   
     <div>
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

