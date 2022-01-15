import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import React from 'react';

export const TopBar = (): React.ReactElement => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        spacestagram
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}