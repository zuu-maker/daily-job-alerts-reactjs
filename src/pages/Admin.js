import { Grid } from '@mui/material'
import React from 'react'
import AdminSidebar from '../componets/AdminSidebar'
import Jobs from './admin/Jobs'

function Admin() {
    return (
        <>
            <Grid container>
                <Grid item sm={2.5}>
                <AdminSidebar/>
                </Grid>
                <Grid item sm={7}>
                    <Jobs/>
                </Grid>
                <Grid item sm={2.5}>
                    
                </Grid>
            </Grid>
        </>
    )
}

export default Admin
