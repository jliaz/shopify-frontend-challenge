import { CircularProgress, Grid, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { ImageCard } from './components/ImageCard';
import { ImageGallery } from './components/ImageGallery';

const API_KEY = "1nT1pUZ40d07zP9XdcMrlIZqvcc5UNodOPyp6ZWC";

export interface Image {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

function App() {
  const [ images, setImages ] = useState<Image[]>([]);
  const [ startDate, setStartDate ] = useState<Date>(new Date("2022-01-01"));
  const [ endDate, setEndDate ] = useState<Date>(new Date());

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod',
      { 
        params: {
          start_date: "2021-12-01",
          end_date: "2022-01-14",
          thumbs: true,
          api_key: API_KEY
        }
      }
    )
    .then((res) => {
      console.log(res);
      setImages(res.data)
    })
  }, []);

  return (
    <div className="App">
      { images.length > 0 ? 
        <ImageGallery images={images}/> :
        <CircularProgress />
       }
    </div>
  );
}

export default App;
