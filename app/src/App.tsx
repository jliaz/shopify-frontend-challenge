import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Alert, Box, Fade, } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import moment from 'moment';
import { DateRangePicker } from './components/DateRangePicker';
import { ImageGallery } from './components/ImageGallery';
import { TopBar } from './components/TopBar';

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#7e8ce0"
    },
    secondary: {
      main: "#ffa48e"
    },
    background: {
      default: "#262833"
    }
  }
})

function App() {
  const [ images, setImages ] = useState<Image[]>([]);
  const [ startDate, setStartDate ] = useState<Date>(new Date("2022-01-01"));
  const [ endDate, setEndDate ] = useState<Date>(new Date());

  const [ alert, setAlert ] = useState<boolean>(false);

  const onStartDateChange = (date: Date): void => {
    setStartDate(date);
  }

  const onEndDateChange = (date: Date): void => {
    setEndDate(date);
  }

  const showAlert = (): void => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
  }, 2500);
  }

  useEffect(() => {
    setImages([]);
    axios.get('https://api.nasa.gov/planetary/apod',
      { 
        params: {
          start_date: moment(startDate).format("YYYY-MM-DD"),
          end_date: moment(endDate).format("YYYY-MM-DD"),
          thumbs: true,
          api_key: API_KEY
        }
      }
    )
    .then((res) => {
      setImages(res.data)
    })
  }, [startDate, endDate]);


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopBar />
        <DateRangePicker 
          start={startDate}
          end={endDate}
          onStartChange={onStartDateChange}
          onEndChange={onEndDateChange}
        />
        <ImageGallery images={images} showCopyAlert={showAlert}/>
        <Box position="fixed" bottom={10} right={10}>
          <Fade in={alert} timeout={1000}>
            <Alert severity="success">Link Copied to Clipboard</Alert>
          </Fade>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
