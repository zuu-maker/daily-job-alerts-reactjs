import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../componets/Navbar";
import Feed from "../componets/Feed";
import Sidebar from "../componets/Sidebar";
import "../pages/home.css";
import { makeStyles } from "@mui/styles";
import Search from "../componets/Search";
import { useStateValue } from "../StateProvider";
import SearchList from "../componets/SearchList";
import Footer from "../componets/Footer";

const useStyles = makeStyles({
  home: {
    width: "100%",
    height: "376px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    backgroundImage: `url("https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")`,
  },
  cover: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: "0.28",
    position: "relative",
  },
});

function Home() {
  const [{ searchList }] = useStateValue();

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={7}>
          <div className={classes.home}>
            <Search />
            <SearchList searchList={searchList} />
          </div>
          <Feed />
        </Grid>
        <Grid item sm={3}>
          <Sidebar />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Home;
