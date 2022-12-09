import { Grid } from '@mui/material'
import React from 'react'
import AddDomain from '../../componets/Admin/AddDomain'
import Domain from '../../componets/Admin/Domain'
import AdminSidebar from '../../componets/AdminSidebar'

function AdminDomain() {
    return (
        <>
        <Grid container>
        <Grid item sm={2.5}>
        <AdminSidebar/>
        </Grid>
        <Grid item sm={7}>
            {/* <Jobs/> */}
            <AddDomain/>
            <Domain/>
        </Grid>
        <Grid item sm={2.5}>
            
        </Grid>
        </Grid>
    </>
    )
}

export default AdminDomain
