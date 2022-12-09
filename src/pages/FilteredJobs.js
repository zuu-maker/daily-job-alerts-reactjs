import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import { db } from "../firebase";
import FilteredFeed from "../componets/FilteredFeed";
import { useParams } from "react-router-dom";

function FilteredJobs() {
  let params = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    db.collection("Jobs")
      .where("domain", "==", params.domain)
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
    <>
      <Navbar />
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={7}>
          <FilteredFeed jobs={jobs} />
        </Grid>
        <Grid item sm={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  );
}

export default FilteredJobs;
