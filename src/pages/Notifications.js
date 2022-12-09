import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Alert from "../componets/Alert";
import Navbar from "../componets/Navbar";
import { db } from "../firebase";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    db.collection("Notifications").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setCounter(4);
          // console.log("New city: ", change.doc.data());
        }
      });

      setNotifications(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  //  useEffect(() => {
  //     db.collection('Notifications').
  //  },[])

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={7}>
          <h1>Notify Me</h1>
          {counter}
          {notifications.map((notification) => (
            <Alert
              title={notification.data.title}
              description={notification.data.description}
            />
          ))}
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid>
    </>
  );
}

export default Notifications;
