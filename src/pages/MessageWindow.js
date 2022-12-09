import { TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import Text from "../componets/Text";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";
import { db } from "../firebase";
import "../componets/message.css";

const useStyles = makeStyles({
  container: {
    margin: "auto",
    borderRight: "2px solid #3F51B5",
    borderLeft: "2px solid #3F51B5",
    backgroundColor: "#DEDDDD !important",
    height: "70vh",
    padding: "16px",
  },
  innerContainer: {
    height: "100%",
    overflowY: "scroll",
  },
  usernameContainer: {
    position: "fixed",
    background: "transparent",
    zIndex: "10000 !important",
    left: "30px",
  },
  username: {
    color: "#3F51B5",
    fontSize: "32px !important",
    fontWeight: "bold !important",
    marginTop: "12px !important",
    marginBottom: "32px !important",
  },
  textContainer: {
    width: "66%",
    margin: "auto",
    borderRight: "2px solid #3F51B5",
    borderLeft: "2px solid #3F51B5",
    padding: "4px 16px",
    display: "flex",
    alignItems: "center",
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

function MessageWindow() {
  const classes = useStyles();
  let params = useParams();
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [{ currentUser }] = useStateValue();

  useEffect(() => {
    db.collection("Chats")
      .doc(params.mid)
      .collection("Chat")
      .orderBy("dateTime", "asc")
      .onSnapshot((snapshot) => {
        setTexts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    // eslint-disable-next-line
  }, []);

  const data = {
    text: text,
    senderEmail: currentUser?.data?.email,
    senderObjId: currentUser?.userID,
    chatRoomId: params.mid,
    dateTime: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const sendText = (e) => {
    e.preventDefault();

    db.collection("Chats")
      .doc(params.mid)
      .collection("Chat")
      .add(data)
      .then((docRef) => {
        docRef.update({ chatId: docRef.id });
        db.collection("Chats")
          .doc(params.mid)
          .update({
            dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setText("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className={classes.usernameContainer}>
        <Typography className={classes.username} variant="h4">
          ADMIN
        </Typography>
      </div>
      <div
        style={{
          overflowY: "scroll",
        }}
        className="container"
      >
        {/* <div className={classes.innerContainer}> */}
        {texts.map((text) => (
          <Text
            key={text.id}
            sender={text.data.senderEmail}
            text={text.data.text}
          />
        ))}

        {/* <Text 
                    sender={true}
                />
                <Text/>
                <Text/>
                <Text 
                    sender={true}
                />
                 <Text/> */}
        {/* {text} */}
        {/* </div> */}
      </div>
      <div className={classes.textContainer}>
        <TextField
          className={classes.textField}
          id="outlined-multiline-flexible"
          // label="Multiline"
          multiline
          maxRows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon className={classes.textIcon} onClick={sendText} />
      </div>
    </>
  );
}

export default MessageWindow;
