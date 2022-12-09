import React from 'react'
import { makeStyles } from '@mui/styles';
import Post from './Post';

const useStyles = makeStyles({
    container: {
        marginTop:"16px"
    }
})

function FilteredFeed({jobs}) {

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

export default FilteredFeed
