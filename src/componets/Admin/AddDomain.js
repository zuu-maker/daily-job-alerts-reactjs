import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { db } from '../../firebase';

function AddDomain() {

    const [domain, setDomain] = useState('')

    const addDomain = (e) => {
        e.preventDefault();

        db.collection('Domains').add({
            name: domain,
        })  

        setDomain("")
    }

    return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
    >
      <TextField
       id="outlined-basic"
       variant="outlined"
       onChange={(e) => setDomain(e.target.value)}
       value={domain}
       />
      <Button onClick={addDomain} variant="contained">Add Domain +</Button>
    </Box>
    )
}

export default AddDomain
