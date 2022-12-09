import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase";

function AddNotification() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNotification = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      added: true,
      createdOn: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("Notifications").add(data);

    setTitle("");
    setDescription("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <TextField
        type="text"
        id="outlined-basic"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        label="Title"
      />
      <TextField
        type="number"
        id="outlined-basic"
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        label="description"
        multiline
        rows={5}
      />

      <Button onClick={addNotification} variant="contained">
        Add Notification +
      </Button>
    </Box>
  );
}

export default AddNotification;
