import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import BuildIcon from "@material-ui/icons/Build"
import IconButton from "@material-ui/core/IconButton";

class LessonDataRow extends React.Component {
  render() {
    const {data, onDelete, onEdit} = this.props;
    return <TableRow>
      <TableCell> {data.lessonNumber}</TableCell>
      <TableCell> {data.description}</TableCell>
      <TableCell>
        <IconButton aria-label="Delete"
                    onClick={() => onDelete(data.id)}>
          <DeleteIcon/>
        </IconButton>
        <IconButton aria-label="Edit"
                    onClick={() => onEdit(data)}>
          <BuildIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  }
}

export default LessonDataRow;