import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    container: {
        marginTop:"16px",
        borderRadius:"16px !important",
        backgroundColor:"#a8b6c1 !important",
    }
})

function Alert({title,description}) {

    const classes = useStyles()

    return (
        <Card 
        raised={true}
        className={classes.container}
        sx={{ minWidth: 405, maxHeight:200 }}>

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      
    </Card>
    )
}

export default Alert
