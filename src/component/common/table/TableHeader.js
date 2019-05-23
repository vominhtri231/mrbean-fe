import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const TableHeader = withStyles(theme => ({
  head: {
    fontSize: 16,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);
