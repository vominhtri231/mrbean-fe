import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import BuildIcon from "@material-ui/icons/Build"
import IconButton from "@material-ui/core/IconButton";
import PageviewIcon from "@material-ui/icons/Pageview"

class LessonDataRow extends React.Component {
  render() {
    const {data, onDelete, watchMode, onChoose} = this.props;
    return <TableRow>
      <TableCell> {data.lessonNumber}</TableCell>
      <TableCell> {data.description}</TableCell>
      {!watchMode ?
        <TableCell>
          <IconButton aria-label="Delete"
                      onClick={() => onDelete(data.id)}>
            <DeleteIcon/>
          </IconButton>
          <IconButton aria-label="Edit"
                      onClick={() => onChoose(data)}>
            <BuildIcon/>
          </IconButton>
        </TableCell> :
        <TableCell>
          <IconButton aria-label="Lesson content"
                      onClick={() => onChoose(data)}>
            <PageviewIcon/>
          </IconButton>
        </TableCell>
      }
    </TableRow>
  }
}

export default LessonDataRow;