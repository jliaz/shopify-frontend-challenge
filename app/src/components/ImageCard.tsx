import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface ImageCardProps {
    title: string;
    imageUrl: string;
    date: string;
    explanation: string;
}

export const ImageCard = (props: ImageCardProps):  React.ReactElement => {
    const { title, imageUrl, date, explanation } = props;
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Card>
            <CardMedia 
                component="img"
                alt={title}
                height="300px"
                image={imageUrl}
            />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align="left">
                        { title }
                    </Typography>
                    { open ? 
                        <Typography gutterBottom variant="body2" component="div" align="left">
                            { explanation }
                        </Typography> : null
                    }
                </CardContent>
            
        </Card>
    )
}