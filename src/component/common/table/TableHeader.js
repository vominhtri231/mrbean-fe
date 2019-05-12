import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const TableHeader = withStyles(theme => ({
  head: {
    fontSize: 16,
    backgroundColor: '#b1b9bf',
    color: theme.palette.common.black,
  },
}))(TableCell);
