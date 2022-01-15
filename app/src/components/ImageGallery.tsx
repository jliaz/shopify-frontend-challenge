import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { Image } from '../App';
import { ImageCard } from './ImageCard';

interface ImageGalleryProps {
    images: Image[];
    showCopyAlert: Function;
}

export const ImageGallery = (props: ImageGalleryProps): React.ReactElement => {
    const { images, showCopyAlert } = props;
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={5}
            padding={5}
        >
            {
                images.length > 0 ? images.map((image, index) => {
                    return (
                        <Grid item key={index} md={4} xs={12}>
                            <ImageCard 
                                key={index}
                                title={image.title} 
                                imageUrl={image.url}
                                date={image.date}
                                explanation={image.explanation}
                                showCopyAlert={showCopyAlert}
                            />
                        </Grid>
                    )
                }) : 
                <Grid item xs={12} md={12}>
                    <CircularProgress size={200}/>
                </Grid>
            }
      </Grid>
    )
}