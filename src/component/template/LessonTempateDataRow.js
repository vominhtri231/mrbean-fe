import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import BuildIcon from "@material-ui/icons/Build"
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add"
import Chip from "@material-ui/core/Chip";

class LessonTemplateDataRow extends React.Component {
  render() {
    const {
      data, onDelete, onEdit, addHomeworkTemplate, editHomeworkTemplate, deleteHomeworkTemplate,
    } = this.props;
    const chipStyle = {margin: 8};
    return <TableRow>
      <TableCell> {data.description}</TableCell>
      <TableCell>
        {data.homeworkTemplateList && data.homeworkTemplateList.length ?
          <>
            {data.homeworkTemplateList.map(homework => {
                return <Chip
                  key={homework.id}
                  label={homework.name}
                  style={chipStyle}
                  onDelete={() => deleteHomeworkTemplate(homework)}
                  onClick={() => editHomeworkTemplate(data.id, homework)}
                />
              }
            )}
          </>
          : "There are no homework yet"
        }
        <IconButton onClick={() => addHomeworkTemplate(data.id)}>
          <AddIcon/>
        </IconButton>
      </TableCell>
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

export default LessonTemplateDataRow;