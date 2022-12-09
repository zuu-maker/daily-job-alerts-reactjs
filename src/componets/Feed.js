import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import Post from './Post';
import { db } from '../firebase';

const useStyles = makeStyles({
    container: {
        marginTop:"16px"
    }
})



function Feed() {

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

    
        
        console.log(jobs);
    
    

    const classes = useStyles()
    

    return (
        <div className={classes.container}>
            {
                jobs.map((job) =>
                    
                    <Post
                    key={job.id}
                    id={job.id}
                    title={job.data.title}
                    description={job.data.description}
                    domain={job.data.domain}
                    experience={job.data.experience}
                    location={job.data.location}
                    showButton={true}
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

export default Feed
