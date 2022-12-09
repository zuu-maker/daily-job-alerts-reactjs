import React, { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";

const useStyles = makeStyles({
  container: {
    marginTop: "24px",
    width: "56%",
    margin: "auto",
  },
  card: {
    backgroundColor: "#3F51B5 !important",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "14px",
  },
  button: {
    marginRight: "12px !important",
    backgroundColor: "white !important",
    borderRadius: "12px !important",
    color: "#56ADF2 !important",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
    marginBottom: "8px",
  },
  info: {
    fontSize: "10px",
    color: "#56ADF2",
    fontWeight: "bold",
  },
  text: {
    marginBottom: "8px !important",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 340,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function Job() {
  const classes = useStyles();
  let params = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [{ currentUser }] = useStateValue();
  const receiverEmail = currentUser?.data?.email;
  // const contactEmail = "zulumkhuzo@gmail.com";

  const userChatRef = db
    .collection("Chats")
    .where("users", "array-contains", currentUser && currentUser?.data?.email);
  const [chatsSnap] = useCollection(userChatRef);

  useEffect(() => {
    db.collection("Jobs")
      .doc(params.id)
      .onSnapshot((doc) => {
        setJob({
          title: doc.data()?.title,
          experience: doc.data()?.experience,
          domain: doc.data()?.domain,
          price: doc.data()?.price,
          location: doc.data()?.location,
          description: doc.data()?.description,
        });
        setContactEmail(doc.data()?.employerEmail);
        console.log("Current data: ", doc.data());
      });
  }, [params.id]);

  const submitForm = () => {
    window.open(
      `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(name)} (${encodeURIComponent(
        email
      )}): ${encodeURIComponent(message)}`
    );
  };

  const chatExists = (receiverEmail) => {
    return !!chatsSnap?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === receiverEmail)?.length > 0
    );
  };

  const createMessage = async (e) => {
    // console.log(chatsSnap);
    // console.log(currentUser.email);
    // console.log(otherUser);
    // console.log(!chatExists(otherUser.email));
    //adding chats to db
    if (chatExists(receiverEmail)) {
      navigate("/messages/" + currentUser?.data?.chatRoomId);
      // alert("You already have a chat with that email")
      // console.log(currentUser?.data?.chatRoomId);
      // setChats(
      //     chatsSnap.docs.map(doc => (
      //     {
      //         id:doc.id,
      //         data: doc.data()
      //     }
      // )))
      // console.log(chats);
    } else if (currentUser?.data?.email) {
      db.collection("Chats")
        .add({
          dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          users: [currentUser.data.email],
          user: {
            // objectId:currentUser.uid,
            email: currentUser.data.email,
            firstName: currentUser.data.firstName,
            lastName: currentUser.data.lastName,
          },
        })
        .then((docRef) => {
          docRef.update({ chatRoomId: docRef.id });
          db.collection("Users")
            .doc(currentUser?.userID)
            .update({ chatRoomId: docRef.id })
            .then(() => {
              navigate("/messages/" + docRef.id);
            })
            .catch((error) => {
              console.log(error.message);
            });
          // db.collection('Users').doc(currentUser.uid).collection('ChatRoomIds').add(
          //     {
          //         id: docRef.id,
          //         isDeleted: false,
          //         isDelivered: false,
          //     }).then(() => {
          //     history.push(`/messages/${docRef.id}`)
          // }).catch((error) => {
          //     console.log(error.message)
          // })
          // navigate("/messages/"+docRef.id)
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }

    // if(currentUser.data.email  )
    // {

    //     db.collection("Chats").add({
    //         dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    //         users:[currentUser.data.email],
    //         user: {
    //                 // objectId:currentUser.uid,
    //                 email: currentUser.data.email,
    //                 firstName:currentUser.data.firstName,
    //                 lastName:currentUser.data.lastName,
    //         }
    //     })
    //     .then(docRef => {
    //             docRef.update({chatRoomId: docRef.id})
    //             navigate("/messages/"+docRef.id)
    // db.collection('Users').doc(currentUser.uid).collection('ChatRoomIds').add(
    //     {
    //         id: docRef.id,
    //         isDeleted: false,
    //         isDelivered: false,
    //     }).then(() => {
    //     history.push(`/messages/${docRef.id}`)
    // }).catch((error) => {
    //     console.log(error.message)
    // })
    // Redirect to the newly created chatRoom  endpoint

    //         })
    //         .catch(function (error) {
    //             console.error("Error adding document: ", error);
    //         });
    // }

    // else if(chatExists(otherUser.email)){
    //     setLoader(false)
    //     history.push(`/messages`)
    // }

    // Chatroom Data
    //Show Loader
    // setLoader(true)

    //Create a chatroom once user clicks on message
    // await db.collection('ChatRooms').add(data).then(function (docRef) {

    // setChatRoom(Object.assign(data,{chatRoomId: docRef.id}))

    // Update Id field in the chatroom document using the document reference id
    // docRef.update({chatRoomId: docRef.id})

    // Hide Loader
    // setLoader(false)

    // Redirect to the newly created chatRoom  endpoint
    // history.push(`/messages/${docRef.id}`)

    // })
    //     .catch(function (error) {
    //         setLoader(false)
    //         console.error("Error adding document: ", error);
    //     });
  };

  return (
    <>
      <Navbar />
      <div>
        <div className={classes.container}>
          <Card className={classes.card} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14, color: "white" }}
                color="text.secondary"
                gutterBottom
              >
                <b>Title:</b> {job.title}
              </Typography>
              <Typography
                sx={{ fontSize: 14, color: "white" }}
                color="text.secondary"
                gutterBottom
              >
                <b>Experience:</b> {job.experience}
              </Typography>
              <Typography
                sx={{ fontSize: 14, color: "white" }}
                color="text.secondary"
                gutterBottom
              >
                <b>Location:</b> {job.location}
              </Typography>
              <Typography
                sx={{ fontSize: 14, color: "white" }}
                color="text.secondary"
                gutterBottom
              >
                <b>Domain:</b> {job.domain}
              </Typography>
              <Typography
                sx={{ fontSize: 14, color: "white" }}
                color="text.secondary"
                gutterBottom
              >
                <b>Price:</b> ${job.price}
              </Typography>

              <Typography style={{ color: "white" }} variant="body2">
                {job.description}
              </Typography>
              <div className={classes.infoContainer}>
                <Typography className={classes.info} variant="p">
                  To apply with CV press apply
                </Typography>
                <Typography className={classes.info} variant="p">
                  Any questions about the job? press message
                </Typography>
              </div>
              {currentUser?.data && (
                <div className={classes.buttonContainer}>
                  <Button
                    onClick={handleOpen}
                    className={classes.button}
                    variant="contained"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={createMessage}
                    className={classes.button}
                    variant="contained"
                  >
                    Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          // sx={{
          //     '& > :not(style)': { m: 1, width: '25ch' },
          // }}
          sx={style}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth={true}
            className={classes.text}
            id="outlined-basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="outlined"
          />
          <TextField
            fullWidth={true}
            className={classes.text}
            id="outlined-basic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
          />
          <TextField
            fullWidth={true}
            className={classes.text}
            id="outlined-basic"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            label="Subject"
            variant="outlined"
          />
          <TextField
            className={classes.text}
            fullWidth={true}
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxRows={4}
            variant="outlined"
          />
          <Button onClick={submitForm} type="submit" variant="contained">
            Submit
          </Button>
        </Box>
        {/* <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box> */}
      </Modal>
    </>
  );
}

export default Job;
