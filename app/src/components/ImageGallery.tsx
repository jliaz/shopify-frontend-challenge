import { Grid } from '@mui/material';
import React from 'react';
import { Image } from '../App';
import { ImageCard } from './ImageCard';

interface ImageGalleryProps {
    images: Image[];
}

export const ImageGallery = (props: ImageGalleryProps): React.ReactElement => {
    const { images } = props;
    return (
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={3}
        >
            {
                images.map((image, index) => {
                    return (
                        <Grid item xs={3}>
                            <ImageCard 
                                key={index}
                                title={image.title} 
                                imageUrl={image.url}
                                date={image.date}
                                explanation={image.explanation}
                            />
                        </Grid>
                    )
                })
            }
      </Grid>
    )
}