import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const TableHeader = withStyles(theme => ({
  head: {
    fontSize: 16,
    backgroundColor: '#2196f3',
    color: theme.palette.common.black,
  },
}))(TableCell);
