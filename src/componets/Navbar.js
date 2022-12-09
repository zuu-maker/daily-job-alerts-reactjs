import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Badge from "@mui/material/Badge";
import SearchOther from "./SearchOther";

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: "#3F51B5",
    display: "flex",
    justifyContent: "space-between",
    color: "#56ADF2",
  },
  search: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    width: "29%",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    marginRight: "16px",
    // fontSize:"64px"
  },
  logo: {
    cursor: "pointer",
  },
});

function Navbar({ isAdmin }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [{ currentUser }, dispatch] = useStateValue();
  const receiverEmail = currentUser?.data?.email;

  const userChatRef = db
    .collection("Chats")
    .where("users", "array-contains", currentUser && currentUser?.data?.email);
  const [chatsSnap] = useCollection(userChatRef);

  const leave = () => {
    auth.signOut();
    dispatch({
      type: "LOG_IN",
      payload: null,
    });
    navigate("/login");
  };

  const chatExists = (receiverEmail) => {
    return !!chatsSnap?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === receiverEmail)?.length > 0
    );
  };

  const createMessage = async (e) => {
    if (chatExists(receiverEmail)) {
      navigate("/messages/" + currentUser?.data?.chatRoomId);
    } else if (currentUser?.data?.email) {
      db.collection("Chats")
        .add({
          dateLastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          users: [currentUser.data.email],
          user: {
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
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.logo}
          variant="h4"
          onClick={() => navigate("/")}
        >
          DJA
        </Typography>
        {/* <p onClick={() => clickMe()} >Click Me</p> */}
        {window.location.pathname !== "/" && <SearchOther />}
        {/* <div className={classes.search}>
                    <SearchIcon/>
                    <InputBase placeholder="Search..."/>
                </div> */}
        <div className={classes.icons}>
          {currentUser?.data && (
            <>
              {currentUser?.data?.alerts && (
                <Badge
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  color="error"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  <NotificationsIcon
                    onClick={() => navigate("/notifications")}
                    fontSize="large"
                    className={classes.icon}
                  />
                </Badge>
              )}
              <div>
                <MessageIcon
                  onClick={createMessage}
                  fontSize="large"
                  className={classes.icon}
                />
              </div>
              <FavoriteIcon
                onClick={() => navigate("/favourites")}
                fontSize="large"
                className={classes.icon}
              />
            </>
          )}

          <div onClick={leave}>
            <Avatar>{currentUser?.data?.firstName[0]}</Avatar>
            {/* {currentUser ? "logout" +  : } */}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
