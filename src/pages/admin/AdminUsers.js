import { Grid } from '@mui/material'
import React from 'react'
import Users from '../../componets/Admin/Users'
import AdminSidebar from '../../componets/AdminSidebar'

function AdminUsers() {
    return (
        <>
        <Grid container>
        <Grid item sm={2.5}>
        <AdminSidebar/>
        </Grid>
        <Grid item sm={8}>
            {/* <Jobs/> */}
            <Users/>
        </Grid>
        <Grid item sm={1.5}>
            
        </Grid>
        </Grid>
    </>
    )
}

export default AdminUsers
