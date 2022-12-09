import { Grid, Typography } from "@mui/material";
import React from "react";
import Contacts from "../../componets/Admin/Contacts";
import AdminSidebar from "../../componets/AdminSidebar";
import { makeStyles } from "@mui/styles";
import "../../componets/message.css";

const useStyles = makeStyles({
  container: {
    width: "100%",
    margin: "auto",
    borderRight: "2px solid #3F51B5",
    borderLeft: "2px solid #3F51B5",
    height: "100vh",
    // overflowY:"scroll",
    // scrollBarWidth: "auto",
    // scroll:"hidden",
    padding: "16px",
  },
  innerContainer: {
    // marginTop:"60px",
    // marginBottom:"400px !important",
    // zIndex:"-1",
    // height:"70
    height: "100vh",
    width: "100%",
    overflowY: "scroll",
  },
  usernameContainer: {
    // backgroundColor:"trans !important",
    // position:"fixed",
    // background:"transparent",
    // zIndex:"10000 !important",
    // top:"px",
    // left: "30px"
    paddingTop: "30px",
  },
  username: {
    color: "#3F51B5",
    fontSize: "20px !important",
    // fontWeight:"bold !important",
    // position:"fixed",
    // zIndex:"10000 !important",
    marginLeft: "30px !important",
    marginTop: "16px !important",
    marginBottom: "10px !important",
  },
  textContainer: {
    // width: "67.70%",
    width: "94%",
    margin: "auto",
    borderRight: "2px solid #3F51B5",
    borderLeft: "2px solid #3F51B5",
    padding: "4px 16px",
    // marginTop:"300px !important",
    display: "flex",
    alignItems: "center",
    // width:"66%",
    // position: "fixed !important",
    // bottom: "16px",
  },
  textField: {
    width: "100%",
  },
  textIcon: {
    fontSize: "46px !important",
    color: "#3F51B5 !important",
    cursor: "pointer",
  },
});

function AdminMessages() {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item sm={2.5}>
          <div className={classes.usernameContainer}>
            <Typography className={classes.username} variant="h7">
              Talking to ADMIN
            </Typography>
          </div>

          <AdminSidebar />
        </Grid>
        <Grid item sm={6.5}></Grid>
        <Grid item sm={3}>
          <Contacts />
        </Grid>
      </Grid>
    </>
  );
}

export default AdminMessages;
