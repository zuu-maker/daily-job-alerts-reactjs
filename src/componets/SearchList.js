import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  box: {
    position: "absolute",
    borderRadius: "10px",
    top: "85%",
    left: "35%",
    width: "38% !important",
  },
  icon: {
    color: "#56ADF2 !important",
    marginLeft: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
});

function SearchList({ searchList }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [{ show }, dispatch] = useStateValue();

  const handleShow = () => {
    dispatch({
      type: "RESET",
      payload: [],
    });
    dispatch({
      type: "SET_SHOW",
      payload: false,
    });
  };

  // useEffect(() => {
  //   setList(searchList)
  //   console.log(list);
  // },[searchList])

  return (
    <Box
      className={classes.box}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <nav aria-label="secondary mailbox folders">
        {/* {searchList[0].map(item => (
            <p>{item?.data?.title}</p>
          ))}
          <p>{title}</p> */}
        {show && searchList[0] && (
          <>
            <CancelIcon
              fontSize="large"
              className={classes.icon}
              onClick={handleShow}
            />
            <List>
              {searchList[0]?.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => navigate("/job/" + item.id)}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
                      primary={item?.data?.title}
                      secondary={item?.data?.description?.substring(0, 100)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </nav>
    </Box>
  );
}

export default SearchList;
