import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Collapse, Fade, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShareIcon from '@mui/icons-material/Share';

interface ImageCardProps {
    title: string;
    imageUrl: string;
    date: string;
    explanation: string;
    showCopyAlert: Function;
}

export const ImageCard = (props: ImageCardProps):  React.ReactElement => {
    const { title, imageUrl, date, explanation, showCopyAlert } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        const likedImages = localStorage.getItem('liked');
        if (!likedImages) {
            localStorage.setItem('liked', JSON.stringify([]));
        } else {
            if (JSON.parse(likedImages).includes(title)) {
                setLiked(true);
            }
        }
    }, [title]);

    const onLike = (liked: boolean) => {
        setLiked(liked);
        if (liked) {
            const local = localStorage.getItem("liked");
            if (local === null) return;
            const a = JSON.parse(local);
            a.push(title);
            localStorage.setItem("liked", JSON.stringify(a));
        } else {
            const local = localStorage.getItem("liked");
            if (local === null) return;
            const a = JSON.parse(local);
            const index = a.indexOf(title);
            a.splice(index, 1);
            localStorage.setItem("liked", JSON.stringify(a));
        }
    }
    return (
        <Card 
            sx={{
                borderRadius:5
            }}
        >
            <Collapse in={!open}>
                <CardMedia 
                    component="img"
                    alt={title}
                    height="300px"
                    image={imageUrl}
                />
            </Collapse>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Grid item xs={6} marginLeft={1} height="50px">
                        <Typography variant="body1" component="div" align="left" >
                            <b> { title } </b>
                        </Typography>
                        <Typography variant="body2" component="div" align="left">
                            { date }
                        </Typography>
                    </Grid>
                    <Grid xs={4} item container direction="row" justifyContent="flex-end" alignItems="flex-end">
                        <IconButton onClick={() => {navigator.clipboard.writeText(imageUrl); showCopyAlert()}}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="like photo" onClick={()=>{onLike(!liked)}} >
                            { liked ? 
                                <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />
                            }
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
            <CardContent sx={{
                padding: 0,
            }}>
                <Fade in={!open} unmountOnExit>
                    <IconButton aria-label="expand photo details" onClick={()=>{setOpen(!open)}} >
                        <KeyboardArrowUpIcon/>
                    </IconButton>
                </Fade>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Typography variant="body2" component="div" align="left">
                        <Box height="300px" maxHeight="300px" sx={{ 
                            overflowY: 'auto',
                            padding: '20px',
                            boxSizing: 'border-box'
                        }}>
                            { explanation }
                        </Box>
                    </Typography>
                </Collapse>
                <Fade in={open} unmountOnExit>
                    <IconButton aria-label="close photo details" onClick={()=>{setOpen(!open)}} >
                        <KeyboardArrowDownIcon/>
                    </IconButton>
                </Fade>
            </CardContent>
        </Card>
    )
}