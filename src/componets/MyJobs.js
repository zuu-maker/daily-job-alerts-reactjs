import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Post from "./Post";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

const useStyles = makeStyles({
  container: {
    marginTop: "16px",
  },
});

function MyJobs() {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [{ currentUser }] = useStateValue();

  useEffect(() => {
    db.collection("Users")
      .doc(currentUser?.userID)
      .collection("Favourites")
      .onSnapshot((snapshot) => {
        setJobs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      {jobs.length > 0
        ? jobs.map((job) => (
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
          ))
        : "No Jobs here"}
    </div>
  );
}

export default MyJobs;
