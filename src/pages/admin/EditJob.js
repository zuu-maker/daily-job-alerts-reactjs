import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminSidebar from '../../componets/AdminSidebar';
import Post from '../../componets/Post';
import { db } from '../../firebase';

function EditJob() {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [experience, setExperience] = useState('')
    const [location, setLocation] = useState('')
    const [domain, setDomain] = useState('')
    const [description, setDescription] = useState('')
    const [employerEmail, setEmployerEmail] = useState('')

    let params = useParams()
    const[job, setJob] = useState({})

     useEffect(() => {
        db.collection("Jobs").doc(params.jid)
        .onSnapshot((doc) => {
            setJob({ 
                title:doc.data()?.title,
                experience:doc.data()?.experience,
                domain:doc.data()?.domain,
                price:doc.data()?.price,
                location:doc.data()?.location,
                description:doc.data()?.description,
                employerEmail:doc.data()?.employerEmail
            })

            setTitle(doc.data()?.title)
            setPrice(doc.data()?.price)
            setExperience(doc.data()?.experience)
            setLocation(doc.data()?.location)
            setDomain(doc.data()?.domain)
            setDescription(doc.data()?.description)
            setEmployerEmail(doc.data()?.employerEmail)
            console.log("Current data: ", doc.data());
        });     
    },[params.jid])

    const editJob = (e) => {
        e.preventDefault();

        const data = {
            title: title,
            description: description,
            price: price,
            experience: experience,
            domain: domain,
            location: location,
            employerEmail: employerEmail,
        }

        db.collection('Jobs').doc(params.jid).update(data)  

        setTitle("")
        setPrice(0)
        setExperience("")
        setLocation("")
        setDomain("")
        setDescription("")
        setEmployerEmail("")    
    }

    return (
        <>
        <Grid container>
        <Grid item sm={2.5}>
        <AdminSidebar/>
        </Grid>
        <Grid item sm={8}>
        <Post
        key={job.id}
        id={job.id}
        title={job.title}
        description={job.description}
        domain={job.domain}
        experience={job.experience}
        location={job.location}
        showButton={false}
        />
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            >
                            
                
            <TextField
            defaultValue="Default Value"
            type="text"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title"
            
            />
            <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            label="Price"
            />
            <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setDomain(e.target.value)}
            value={domain}
            label="Domain"
            />
            <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            label="Location"
            />
            <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setEmployerEmail(e.target.value)}
            value={employerEmail}
            label="employerEmail"
            />
            <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setExperience(e.target.value)}
            value={experience}
            label="Experience"
            
            />
            <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={5}
            value={description}
            label="Description"
            />
            <Button onClick={editJob} variant="contained">Edit Job</Button>
            </Box>
        </Grid>
        <Grid item sm={1.5}>
            
        </Grid>
        </Grid>
    </>
       
      
       
    )
}

export default EditJob
