import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import BuildIcon from "@material-ui/icons/Build"
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck"
import PageviewIcon from "@material-ui/icons/Pageview"
import AddIcon from "@material-ui/icons/Add"
import Chip from "@material-ui/core/Chip";
import DateUtils from "../../util/DateUtils";
import appConstants from "../../util/appConstants";

class LessonDataRow extends React.Component {
  render() {
    const {
      data, onDelete, mode, onChoose, onCheckAttendance,
      addHomework, editHomework, deleteHomework,
      doHomework, watchHomework
    } = this.props;
    const chipStyle = {margin: 8};
    const today = DateUtils.getCurrentDate();
    return <TableRow>
      <TableCell> {data.lessonNumber}</TableCell>
      <TableCell> {data.description}</TableCell>
      <TableCell>
        {data.homeworkList && data.homeworkList.length ?
          <>
            {data.homeworkList.map(homework => {
                const over = today > homework.deathLine;
                const ended = homework.ended;
                const color = over ? ended ? "default" : "secondary" : "primary";
                return mode === appConstants.modes.Student ?
                  <Chip key={homework.id}
                        label={homework.name}
                        style={chipStyle}
                        onClick={!over ?
                          () => doHomework(homework) :
                          () => watchHomework(homework)}
                        color={color}
                  /> :
                  mode === appConstants.modes.Teacher ?
                    <Chip key={homework.id}
                          label={homework.name}
                          style={chipStyle}
                          onDelete={!homework.ended ? () => deleteHomework(homework) : undefined}
                          onClick={ended ?
                            () => watchHomework(homework) :
                            () => editHomework(data.id, homework)}
                          color={color}
                    /> :
                    <Chip key={homework.id}
                          label={homework.name}
                          style={chipStyle}
                          onClick={ended ?
                            () => watchHomework(homework) :
                            () => editHomework(data.id, homework)}
                          color={color}
                    />
              }
            )}
          </>
          : "There are no homework yet"
        }
        {mode === appConstants.modes.Teacher && <IconButton onClick={() => addHomework(data.id)}>
          <AddIcon/>
        </IconButton>}
      </TableCell>
      {mode === appConstants.modes.Teacher ?
        <TableCell>
          <IconButton aria-label="Delete"
                      onClick={() => onDelete(data)}>
            <DeleteIcon/>
          </IconButton>
          <IconButton aria-label="Edit"
                      onClick={() => onChoose(data)}>
            <BuildIcon/>
          </IconButton>
          <IconButton aria-label="Check attendance"
                      onClick={() => onCheckAttendance(data)}>
            <PlaylistAddCheckIcon/>
          </IconButton>
          <IconButton/>
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