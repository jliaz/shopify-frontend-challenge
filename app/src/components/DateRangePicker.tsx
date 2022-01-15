import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Grid, TextField } from '@mui/material';
import React from 'react';

interface DateRangePickerProps {
    start: Date;
    end: Date;
    onStartChange: any;
    onEndChange: any;
}

export const DateRangePicker = (props: DateRangePickerProps): React.ReactElement => {
    const { start, end, onStartChange, onEndChange } = props;
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Grid 
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{
                    marginTop: '50px',
                }}
                padding={5}
                spacing={3}
            >
                <Grid item>
                    <MobileDatePicker 
                        label="Start"
                        aria-label="start date picker"
                        inputFormat="YYYY-MM-DD"
                        value={start}
                        onChange={onStartChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item>
                    <MobileDatePicker
                        label="End"
                        aria-label="end date picker"
                        inputFormat="YYYY-MM-DD"
                        value={end}
                        onChange={onEndChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </Grid>
        </LocalizationProvider>
        
    )
}