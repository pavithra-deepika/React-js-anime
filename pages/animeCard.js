import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';


export default function AnimeCard({movie}) {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>        
        <CardContent>
        <img src = {movie.images.jpg.image_url}></img>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Episodes: {movie.episodes}, genres: {movie.genres.map(genre => genre.name + ", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
