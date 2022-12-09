import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles({
  icon: {
    cursor: "pointer !important",
    color: "white !important",
  },
  search: {
    backgroundColor: "#4E573D !important",
    position: "absolute",
    top: "74%",
    left: "34%",
    display: "flex",
    alignItems: "center",
    width: "38%",
    // zIndex: 1000,
    padding: "5px",
    borderRadius: "20px",
  },
});

function Search() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [, dispatch] = useStateValue();

  const handleSearch = async (e) => {
    e.preventDefault();

    db.collection("Jobs")
      .where("title", "==", search.toLocaleLowerCase())
      .get()
      .then((querySnapshot) => {
        let things = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          things.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        dispatch({
          type: "SET_SEARCH",
          payload: things,
        });

        dispatch({
          type: "SET_SHOW",
          payload: true,
        });

        console.log(things);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // },[search])

    // alert("hey")
  };

  return (
    <div className={classes.search}>
      <SearchIcon
        className={classes.icon}
        onClick={handleSearch}
        fontSize="large"
      />
      <InputBase
        sx={{ color: "white" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
