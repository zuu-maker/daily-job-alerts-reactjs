import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

const useStyles = makeStyles({
  card: {
    margin: "16px 5px",
    backgroundColor: "#3F51B5 !important",
    color: "white !important",
  },
  button: {
    maxWidth: "200px",
    marginTop: "12px !important",
    borderRadius: "10px !important",
    backgroundColor: "white !important",
    color: "#56ADF2 !important",
    fontSize: "12px !important",
    padding: "8px 8px !important",
    marginRight: "12px !important",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    cursor: "pointer",
  },
  typo: {
    color: "white !important",
  },
});

function Post({
  id,
  title,
  description,
  domain,
  experience,
  location,
  showButton,
  isAdmin,
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [{ currentUser, favourites }] = useStateValue();

  useEffect(() => {
    console.log(favourites);
  }, [favourites]);

  const addFav = () => {
    console.log(currentUser?.userID);
    db.collection("Users")
      .doc(currentUser?.userID)
      .collection("Favourites")
      .add({
        id: id,
        title: title,
        description: description,
        domain: domain,
        experience: experience,
        location: location,
      });
  };

  const deleteJob = () => {
    db.collection("Jobs").doc(id).delete();
  };

  return (
    <div>
      <Card className={classes.card} sx={{ minWidth: 275 }}>
        <CardContent>
          <div className={classes.innerContainer}>
            <Typography
              sx={{ fontSize: 14, color: "white" }}
              color="text.secondary"
              gutterBottom
            >
              <b>Title:</b> {title}
            </Typography>
            <Typography
              sx={{ fontSize: 14, color: "white" }}
              color="text.secondary"
              gutterBottom
            >
              <b>Experience:</b> {experience}
            </Typography>
          </div>
          <div className={classes.innerContainer}>
            <Typography
              sx={{ fontSize: 14, color: "white" }}
              color="text.secondary"
              gutterBottom
            >
              <b>Location:</b> {location}
            </Typography>
            <Typography
              sx={{ fontSize: 14, color: "white" }}
              color="text.secondary"
              gutterBottom
            >
              <b>Domain:</b> {domain}
            </Typography>
          </div>
          <Typography
            className={classes.description}
            onClick={() => navigate("/job/" + id)}
            variant="body2"
          >
            {description}
          </Typography>
          {currentUser?.data && showButton && (
            <Button
              // onClick={() => navigate("/")}
              className={classes.button}
              // type="submit"
              onClick={addFav}
              variant="contained"
            >
              Add to Favourites
            </Button>
          )}
          {isAdmin && (
            <div>
              <Button
                // onClick={() => navigate("/")}
                className={classes.button}
                // type="submit"
                onClick={() => navigate("/admin/edit-job/" + id)}
                variant="contained"
              >
                Edit
              </Button>
              <Button
                // onClick={() => navigate("/")}
                className={classes.button}
                // type="submit"
                onClick={deleteJob}
                variant="contained"
              >
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Post;
