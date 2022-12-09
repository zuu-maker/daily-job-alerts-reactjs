import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import MyJobs from '../componets/MyJobs'
import Navbar from '../componets/Navbar'

const useStyles = makeStyles({
    title: {
        fontWeight:"bold !important",
        color: "#3F51B5",
        marginTop:"12px !important",
    }
})

function Favourites() {

    const classes = useStyles()

    return (
        <>
            <Navbar />
            <Grid container>
            <Grid item sm={2}></Grid>
            <Grid item sm={7}>
                <Typography className={classes.title} variant="h5">
                    Favourites
                </Typography>
                <MyJobs/>
            </Grid>
            <Grid item sm={3}></Grid>
            </Grid>
        </>
    )
}

export default Favourites
