import { Card, CardContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles({
    container:{
        backgroundColor:"#3F51B5 !important",
        marginBottom:"20px ",
        borderRadius:"42px !important"
    },
    otherContainer:{
        backgroundColor:"#83909A !important",
        marginLeft:"64.8%",
        marginBottom:"20px ",
        borderRadius:"42px !important"
        // textAlign:"right"
    },
    text:{
        color:"white !important"
    }
})

function Text({sender, text}) {

    const classes = useStyles()
    const [{currentUser}] = useStateValue()

    return (
        <>
            <Card raised={true} className={sender === currentUser?.data?.email ? classes.otherContainer:classes.container} sx={{ maxWidth: 270 }}>
                <CardContent>
                    <Typography className={classes.text} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                     {text}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Text
