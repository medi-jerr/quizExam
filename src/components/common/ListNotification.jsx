import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import moment from "moment/moment";

function ListNotification({ list, exist, startTest, errorMessage }) {
  return (
    <List sx={list}>
      {exist && exist.length ? (
        exist.map((item) => (
          <ListItem key={item.id} onClick={() => startTest(item.id)}>
            <ListItemAvatar>
              <Avatar>
                <MenuBookIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={moment(item.id).format("MM/DD/YYYY")}
            />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SentimentVeryDissatisfiedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={errorMessage} />
        </ListItem>
      )}
    </List>
  );
}

export default ListNotification;
