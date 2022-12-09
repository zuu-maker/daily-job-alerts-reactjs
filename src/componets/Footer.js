import { makeStyles } from '@mui/styles'
import React from 'react'
import NewsletterSubscribe from './NewsletterSubscribe'

const useStyles = makeStyles({
    container: {
        // position: 'absolute',
        // zIndex:"10000 !important",
        // width:"",
        // borderRadius:"10px",
        // top:"9.45%",
        // left: "35%",
        // width:"60% !important",
        // right: "auto",
        height: "160px",
        backgroundColor: "whitesmoke",
        paddingTop: "20px"
    },
    icon:{
        color: "#56ADF2 !important",
        marginLeft: "10px",
        marginTop: "10px",
        cursor: "pointer"
    }
})


function Footer() {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <NewsletterSubscribe />
        </div>
    )
}

export default Footer
