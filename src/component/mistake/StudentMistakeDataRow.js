import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class StudentMistakeDataRow extends React.Component {
  render() {
    const {
      data
    } = this.props;
    return <TableRow>
      <TableCell> {data.lesson.lessonNumber}</TableCell>
      <TableCell> {data.lesson.description}</TableCell>
      <TableCell> {data.mistakeType.name}</TableCell>
    </TableRow>
  }
}

export default StudentMistakeDataRow;