import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";

class StudentDataRow extends React.Component {
  render() {
    const {data, onDelete} = this.props;
    return <TableRow>
      <TableCell> {data.name}</TableCell>
      <TableCell> {data.email}</TableCell>
      <TableCell> {data.phoneNumber}</TableCell>
      <TableCell> {data.dateOfBirth}</TableCell>
      <TableCell> {data.workspace}</TableCell>
      <TableCell>
        <IconButton aria-label="Delete"
                    onClick={() => onDelete(data.id)}>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  }
}

export default StudentDataRow;