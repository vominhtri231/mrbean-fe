import React from "react";
import {ListItemIcon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ListItem from "@material-ui/core/ListItem";

class UserListItem extends React.Component {
  render() {
    const {user, onDelete} = this.props;

    return <ListItem>
      <ListItemIcon>
        <CheckCircleIcon/>
      </ListItemIcon>
      <ListItemText style={{width: 100}}
                    primary={user.email}
      />
      <ListItemText
        secondary={user.role.authority}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={() => onDelete(user.id)}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>;
  }
}

export default UserListItem;