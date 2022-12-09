import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    width: "58%",
    marginTop: "2.8%",
    margin: "auto",
  },
  input: {
    width: "298px",
    borderRadius: "10px !important",
    marginTop: "20px !important",
  },
  button: {
    width: "298px",
    marginTop: "12px !important",
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
  checkbox: {
    textAlign: "left",
    marginTop: "12px",
  },
});

function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [domain, setDomain] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("hey");
      db.collection("Users")
        .add({
          email: email,
          firstName: firstName,
          lastName: lastName,
          favourites: [],
          domain: domain,
          alerts: checked,
          chatRoomId: "",
          isAdmin: false,
        })
        .then((doc) => {
          console.log(doc.id);
          dispatch({
            type: "LOG_IN",
            payload: {
              userID: doc.id,
              data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                favourites: [],
                domain: domain,
                alerts: checked,
                chatRoomId: "",
                isAdmin: false,
              },
            },
          });
          navigate("/");
        });
    });

    // then(() => {

    //         .then(() =>
    //         navigate("/"))
    //         .catch(err => console.log(err))
    //     }).catch(err => console.log(err))
    // )
  };

  return (
    <>
      {checked && "domain"}
      <div className={classes.container}>
        <FormControl>
          <TextField
            required={true}
            label="First Name"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required={true}
            label="Last Name"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required={true}
            label="Email"
            type="Email"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            required={true}
            label="Password"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Domain"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <div className={classes.checkbox}>
            <FormControlLabel
              required={true}
              value="start"
              control={
                <Checkbox
                  onClick={() => setChecked(!checked)}
                  checked={checked}
                />
              }
              label="want to receive daily job alerts?"
              labelPlacement="start"
            />
          </div>
          <Button
            // onClick={() => navigate("/")}
            className={classes.button}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
          >
            Sign Up
          </Button>
        </FormControl>
      </div>
    </>
  );
}

export default SignUp;
