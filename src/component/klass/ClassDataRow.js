import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";

class ClassDataRow extends React.Component {
  render() {
    const {data, onDelete, onOpenClassSpecific} = this.props;
    return <TableRow onClick={onOpenClassSpecific}>
      <TableCell> {data.name}</TableCell>
      <TableCell> {data.description}</TableCell>
      <TableCell>{data.teacher.name}</TableCell>
      <TableCell>
        <IconButton aria-label="Delete"
                    onClick={() => onDelete(data.id)}>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  }
}

export default ClassDataRow;