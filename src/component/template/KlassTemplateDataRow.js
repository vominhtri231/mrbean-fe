import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import {Button} from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build"

class KlassTemplateDataRow extends React.Component {
  render() {
    const {
      data, onOpenSpecific, onDelete, onEdit
    } = this.props;
    return <TableRow>
      <TableCell>{data.name}</TableCell>
      <TableCell>
        <Button onClick={() => onOpenSpecific(data)} variant="contained">
          Open
        </Button>
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

export default KlassTemplateDataRow;