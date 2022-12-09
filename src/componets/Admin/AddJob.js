import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { db } from '../../firebase';

function AddJob() {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [experience, setExperience] = useState('')
    const [location, setLocation] = useState('')
    const [domain, setDomain] = useState('')
    const [description, setDescription] = useState('')
    const [employerEmail, setEmployerEmail] = useState('')

    const addJob = (e) => {
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

        db.collection('Jobs').add(data)  

        setTitle("")
        setPrice("")
        setExperience("")
        setLocation("")
        setDomain("")
        setDescription("")
        setEmployerEmail("")
    }

    return (
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
    >
      <TextField
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
       onChange={(e) => setExperience(e.target.value)}
       value={experience}
       label="Experience"
       
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
       onChange={(e) => setDescription(e.target.value)}
       multiline
       rows={5}
       value={description}
       label="Description"
       />
      <Button onClick={addJob} variant="contained">Add Job +</Button>
    </Box>
    )
}

export default AddJob
