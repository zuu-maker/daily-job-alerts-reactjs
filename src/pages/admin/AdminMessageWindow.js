import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Contacts from "../../componets/Admin/Contacts";
import AdminSidebar from "../../componets/AdminSidebar";
import { TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Text from "../../componets/Text";
import SendIcon from "@mui/icons-material/Send";
import "../../componets/message.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";
import { db } from "../../firebase";

const useStyles = makeStyles({
  container: {
    width: "100%",
    margin: "auto",
    borderRight: "2px solid #3F51B5",
    borderLeft: "2px solid #3F51B5",
    height: "100vh",
    padding: "16px",
  },
  innerContainer: {
    height: "100vh",
    width: "100%",
    overflowY: "scroll",
  },
  usernameContainer: {
    paddingTop: "30px",
  },
  username: {
    color: "#3F51B5",
    fontSize: "20px !important",
    marginLeft: "30px !important",
    marginTop: "16px !important",
    marginBottom: "10px !important",
  },
  textContainer: {
    width: "94%",
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

function AdminMessageWindow() {
  const classes = useStyles();
  let params = useParams();
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [{ currentUser, messageName }] = useStateValue();

  const data = {
    text: text,
    senderEmail: currentUser?.data?.email,
    senderObjId: currentUser?.userID,
    chatRoomId: params.amid,
    dateTime: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const sendText = (e) => {
    e.preventDefault();

    db.collection("Chats")
      .doc(params.amid)
      .collection("Chat")
      .add(data)
      .then((docRef) => {
        docRef.update({ chatId: docRef.id });
        db.collection("Chats").doc(params.amid).update({
          dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          lastText: text,
        });
        setText("");
      })
      .catch((error) => {
        alert("error");
        console.log(error.message);
      });
  };

  useEffect(() => {
    db.collection("Chats")
      .doc(params.amid)
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

  return (
    <>
      <Grid container>
        <Grid item sm={2.5}>
          <div className={classes.usernameContainer}>
            <Typography className={classes.username} variant="h7">
              Talking to {messageName}
            </Typography>
          </div>

          <AdminSidebar />
        </Grid>
        <Grid item sm={6.5}>
          <div
            style={{
              overflowY: "scroll",
            }}
            className="adminContainer"
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
               text="yoh yoh what up"
               /> */}

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
        </Grid>
        <Grid item sm={3}>
          <Contacts />
        </Grid>
      </Grid>
    </>
  );
}

export default AdminMessageWindow;
