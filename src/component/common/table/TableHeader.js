import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const TableHeader = withStyles(theme => ({
  head: {
    fontSize: 16,
    backgroundColor: '#f4bc42',
    color: theme.palette.common.black,
  },
}))(TableCell);
