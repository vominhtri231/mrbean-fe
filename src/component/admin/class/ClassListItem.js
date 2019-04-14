import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import {ListItemIcon} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

class ClassListItem extends React.Component {
  render() {
    const {klass, onDelete} = this.props;

    return <ListItem>
      <ListItemIcon>
        <CheckCircleIcon/>
      </ListItemIcon>
      <ListItemText style={{width: 100}}
                    primary={klass.name}
      />
      <ListItemText
        secondary={klass.description}
      />
      <ListItemText style={{width: 100}}
                    primary={klass.teacher.name}
      />
      <ListItemText style={{width: 100}}
                    primary={klass.teacher.email}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete"
                    onClick={() => onDelete(klass.id)}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>;
  }
}

export default ClassListItem;