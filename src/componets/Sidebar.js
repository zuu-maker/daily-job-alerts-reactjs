import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const useStyles = makeStyles({
    container:{
        marginTop:"16px",
        paddingLeft:"8px",
        paddingRight:"20px",
    },
    heading:{
        color:"#555",
        marginLeft:"24px",
        marginBottom:"8px"
    },
    link:{
        color:"#555",
        border: "1px solid #555",
        borderRadius:"7px " ,
        padding: "1px 3px",
        marginRight:"4px !important",
        cursor: "pointer"
    }
})

function Sidebar() {

    const classes = useStyles()
    const navigate = useNavigate()
    const [domains, setDomains] = useState([])

    useEffect(() => {
        db.collection('Domains').onSnapshot(snapshot => {
            setDomains(
                snapshot.docs.map(doc => (
                {
                    id:doc.id,
                    data: doc.data()
                }
            )))
        })    
     },[])

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
            <Typography variant="h6">
                Filter By Domain
            </Typography>
            </div>
           
                <>
                {domains.slice(0,4).map((domain) => 
                (<Typography style={{backgroundColor:"#435324", color:"white"}} onClick={() => navigate("/"+domain.data.name)} className={classes.link} variant="span" href="#">{domain.data.name}</Typography>)
                )}
                <Divider flexItem style={{marginBottom:10, marginTop:10}}/>
                </>
                <>
                {domains.slice(4,8).map((domain) => 
                (<Typography style={{backgroundColor:"#435324", color:"white"}} onClick={() => navigate("/"+domain.data.name)} className={classes.link} variant="span" href="#">{domain.data.name}</Typography>)
                )}
                <Divider flexItem style={{marginBottom:10, marginTop:10}}/>
                </>
                {/* <>
                {domains.slice(8,12).map((domain) => 
                (<Typography className={classes.link} variant="span" href="#">{domain.data.name}</Typography>)
                )}
                <Divider flexItem style={{marginBottom:10, marginTop:10}}/>
                </> */}
                
            
            {/* {
                domains.slice(0,4).map((domain) => 
                <Typography className={classes.link} variant="span" href="#">Illustration</Typography>
                )
            }
            {
                domains.slice(0,4).map((domain) => 
                <Typography className={classes.link} variant="span" href="#">Illustration</Typography>
                )
            } */}
            {/* <Typography onClick={() => navigate("/software")} className={classes.link} variant="span" href="#">Web</Typography>
            <Typography className={classes.link} variant="span" href="#">Illustration</Typography>
            <Typography className={classes.link} variant="span" href="#">graphics</Typography>
            <Typography className={classes.link} variant="span" href="#">Ui</Typography>
            <Divider flexItem style={{marginBottom:10, marginTop:10}}/>
            <Typography className={classes.link} variant="span" href="#">Design</Typography>
            <Typography className={classes.link} variant="span" href="#">App</Typography>
            <Typography className={classes.link} variant="span" href="#">iPhone</Typography>
            <Divider flexItem style={{marginBottom:10, marginTop:10}}/>
            <Typography className={classes.link} variant="span" href="#">icon</Typography>
            <Typography className={classes.link} variant="span" href="#">interface</Typography> */}
        </div> 
    ) 
}

export default Sidebar
