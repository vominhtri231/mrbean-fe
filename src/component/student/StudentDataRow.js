import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import appConstants from "../../util/appConstants";

class StudentDataRow extends React.Component {
  render() {
    const {data, onDelete, mode} = this.props;
    return <TableRow>
      <TableCell> {data.name}</TableCell>
      <TableCell> {data.email}</TableCell>
      <TableCell> {data.phoneNumber}</TableCell>
      <TableCell> {data.dateOfBirth}</TableCell>
      <TableCell> {data.workspace}</TableCell>

      <TableCell>
        {mode === appConstants.modes.Admin ?
          <IconButton aria-label="Delete"
                      onClick={() => onDelete(data)}>
            <DeleteIcon/>
          </IconButton> : <></>}
      </TableCell>
    </TableRow>
  }
}

export default StudentDataRow;