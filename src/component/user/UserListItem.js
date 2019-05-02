import React from "react";
import {ListItemIcon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import BuildIcon from "@material-ui/icons/Build"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ListItem from "@material-ui/core/ListItem";

class UserListItem extends React.Component {
  render() {
    const {user, onDelete, onEdit} = this.props;

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
        <IconButton aria-label="Delete" onClick={() => onDelete(user)}>
          <DeleteIcon/>
        </IconButton>
        <IconButton aria-label="Edit" onClick={() => onEdit(user)}>
          <BuildIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>;
  }
}

export default UserListItem;