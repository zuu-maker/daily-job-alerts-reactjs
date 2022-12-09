import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { db } from '../../firebase';
import Post from '../../componets/Post';
import AddJob from '../../componets/Admin/AddJob';

const useStyles = makeStyles({
    container: {
        marginTop:"16px"
    }
})

function Jobs() {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        db.collection('Jobs').onSnapshot(snapshot => {
            setJobs(
                snapshot.docs.map(doc => (
                {
                    id:doc.id,
                    data: doc.data()
                }
            )))
        })
 
        
     },[])

    
        
        // console.log(jobs);
    
    

    const classes = useStyles()

    return (
        <div className={classes.container}>
        <AddJob/>
        {
            jobs.map((job) =>
                
                <Post
                isAdmin={true}
                key={job.id}
                id={job.id}
                title={job.data.title}
                description={job.data.description}
                domain={job.data.domain}
                experience={job.data.experience}
                location={job.data.location}
                showButton={false}
                />
            )

        }
        {/* 
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}

    </div>
    )
}

export default Jobs
