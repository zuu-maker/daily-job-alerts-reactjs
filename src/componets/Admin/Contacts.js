import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

function Contacts() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    db.collection("Chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // eslint-disable-next-line
  }, []);

  const handleClick = (id, name) => {
    navigate("/admin/messages/" + id);
    setSelected(!selected);
    dispatch({
      type: "SET_MESSAGE_NAME",
      payload: name,
    });
  };

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {chats.map((chat) => (
          <ListItem
            style={{ cursor: "pointer" }}
            selected={selected}
            onClick={() => handleClick(chat.id, chat.data.user.firstName)}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={chat.data.user.firstName}
              secondary={chat.data?.lastText}
            />
          </ListItem>
        ))}

        {/* <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Snow"
                    secondary="rhumba"
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Ollie"
                    secondary="oi"
                    />
                </ListItem> */}
      </List>
    </div>
  );
}

export default Contacts;
