import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import BuildIcon from "@material-ui/icons/Build"

class MistakeTypeDataRow extends React.Component {
  render() {
    const {
      data, onDelete, onEdit
    } = this.props;
    return <TableRow>
      <TableCell> {data.name}</TableCell>
      <TableCell> {data.description}</TableCell>
      <TableCell>
        <IconButton aria-label="Delete"
                    onClick={() => onDelete(data)}>
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

export default MistakeTypeDataRow;