import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddNotification from "../../componets/Admin/AddNotification";
import AdminSidebar from "../../componets/AdminSidebar";
import Alert from "../../componets/Alert";
import { db } from "../../firebase";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    db.collection("Notifications").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
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

  return (
    <>
      <Grid container>
        <Grid item sm={2.5}>
          <AdminSidebar />
        </Grid>
        <Grid item sm={6.5}>
          <AddNotification />
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

export default AdminNotifications;
