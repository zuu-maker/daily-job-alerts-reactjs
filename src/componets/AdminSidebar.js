import React from "react";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles({
  container: {
    marginTop: "16px",
    paddingLeft: "8px",
    paddingRight: "20px",
  },
  heading: {
    color: "#555",
    marginLeft: "24px",
    marginBottom: "8px",
  },
  link: {
    color: "#3F51B5",
    // border: "1px solid #555",
    // borderRadius:"7px " ,
    // padding: "1px 3px",
    // marginRight:"4px !important",
    cursor: "pointer",
    fontWeight: "bold !important",
  },
});

function AdminSidebar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const handleLogout = () => {
    auth.signOut();
    dispatch({
      type: "LOG_IN",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <Typography variant="h5">ADMIN DASHBOARD</Typography>
      </div>
      <List>
        <ListItem className={classes.link} onClick={() => navigate("/admin")}>
          <ListItemIcon>
            <WorkIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="Jobs"
            // secondary='eh'
          />
        </ListItem>
        <ListItem
          className={classes.link}
          onClick={() => navigate("/admin/users")}
        >
          <ListItemIcon>
            <GroupIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="Users"
            // secondary='eh'
          />
        </ListItem>
        <ListItem
          className={classes.link}
          onClick={() => navigate("/admin/domains")}
        >
          <ListItemIcon>
            <CategoryIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="Domains"
            // secondary='eh'
          />
        </ListItem>
        <ListItem
          className={classes.link}
          onClick={() => navigate("/admin/messages")}
        >
          <ListItemIcon>
            <ForumIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="Messages"
            // secondary='eh'
          />
        </ListItem>
        <ListItem
          onClick={() => navigate("/admin/notifications")}
          className={classes.link}
        >
          <ListItemIcon>
            <NotificationsIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="notifications"
            // secondary='eh'
          />
        </ListItem>
        <ListItem className={classes.link} onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="Go to Home"
            // secondary='eh'
          />
        </ListItem>
        <ListItem onClick={() => handleLogout()} className={classes.link}>
          <ListItemIcon>
            <LogoutIcon className={classes.link} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            // secondary='eh'
          />
        </ListItem>
      </List>
    </div>
  );
}

export default AdminSidebar;
