import * as React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/es/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"

class MistakeRuleDataRow extends React.Component {
  render() {
    const {
      data, onDelete, moveUp, moveDown, mistakeTypes, standards
    } = this.props;
    return <TableRow>
      <TableCell>
        <TextField
          select
          value={data.mistakeStandard}
          onChange={this.handleMistakeStandardChange}>
          {standards.map(standard => (
            <MenuItem key={standard} value={standard}>
              {standard}
            </MenuItem>
          ))}</TextField>
        <InputLabel style={{
          position: 'relative',
          top: '10px',
          margin: '20px'
        }}>less than</InputLabel>
        <TextField
          style={{
            width: 50,
          }}
          type='number'
          onChange={this.handleThresholdChange}
          value={data.threshold}/>
      </TableCell>
      <TableCell>
        <TextField
          select
          value={data.mistakeType.id}
          onChange={this.handleMistakeTypeChange}>
          {mistakeTypes.map(mistakeType => (
            <MenuItem key={mistakeType.id} value={mistakeType.id}>
              {mistakeType.name}
            </MenuItem>
          ))}</TextField>
      </TableCell>
      <TableCell>
        {!data.top &&
        <IconButton aria-label="Delete"
                    onClick={() => moveUp(data)}>
          <ArrowUpwardIcon/>
        </IconButton>}
        {!data.bottom &&
        <IconButton aria-label="Delete"
                    onClick={() => moveDown(data)}>
          <ArrowDownwardIcon/>
        </IconButton>}
        <IconButton aria-label="Delete"
                    onClick={() => onDelete(data)}>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  }

  handleMistakeStandardChange = (e) => {
    const {data, onEdit} = this.props;
    const updatedData = {...data, mistakeStandard: e.target.value};
    onEdit(updatedData);
  };
  handleMistakeTypeChange = (e) => {
    const {data, onEdit} = this.props;
    const updatedData = {...data, mistakeType: {id: e.target.value}};
    onEdit(updatedData);
  };
  handleThresholdChange = (e) => {
    const {data, onEdit} = this.props;
    const updatedData = {...data, threshold: e.target.value};
    onEdit(updatedData);
  }
}

export default MistakeRuleDataRow;