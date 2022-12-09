import {
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles({
  container: {
    display: "flex !important",
  },
  innerContainer: {
    textAlign: "center",
    width: "58%",
    marginTop: "13.8%",
    margin: "auto",
  },
  input: {
    width: "298px",
    borderRadius: "10px !important",
    marginTop: "20px !important",
  },
  button: {
    width: "298px",
    marginTop: "20px !important",
    borderRadius: "10px !important",
    backgroundColor: "#3F51B5 !important",
    color: "#56ADF2 !important",
    fontSize: "16px !important",
    padding: "8px 0 !important",
  },
  infoContainer: {
    // width: "298px",
  },
  info: {
    textAlign: "left",
    color: "#3F51B5",
    marginTop: "4px !important",
  },
  link: {
    cursor: "pointer",
  },
  cover: {
    width: "50vw",
    height: "100vh",
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url("https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
  },
  topCover: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.37,
  },
});

function Login() {
  const [, dispatch] = useStateValue();
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleBasedRedirect = (res) => {
    if (res.data.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then((authUser) => {
      db.collection("Users")
        .where("email", "==", authUser.user.email)
        .get()
        .then((querySnapshot) => {
          let user;

          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            user = {
              userID: doc.id,
              data: doc.data(),
            };
          });

          dispatch({
            type: "LOG_IN",
            payload: user,
          });
          roleBasedRedirect(user);
        });
    });

    //   navigate("/")
    // })
    //   .catch(error => {
    //       alert(error)
    //   })
  };

  return (
    <div className={classes.container}>
      {/* {password} */}
      <div className={classes.cover}>
        <div className={classes.topCover}></div>
      </div>
      <div className={classes.innerContainer}>
        <FormControl>
          <TextField
            label="Email"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            className={classes.button}
            type="submit"
            variant="contained"
          >
            Login
          </Button>

          <Typography
            onClick={() => navigate("/signUp")}
            className={classes.info}
            variant="p"
          >
            dont have an account?{" "}
            <Link className={classes.link}>click here</Link>
          </Typography>
          <Typography className={classes.info} variant="p">
            <span className={classes.link}>forgot passord</span>
          </Typography>
        </FormControl>
      </div>
    </div>
  );
}

export default Login;
