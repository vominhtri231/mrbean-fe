import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const TableHeader = withStyles(theme => ({
  head: {
    fontSize: 16,
    backgroundColor: "#827979",
    color: theme.palette.common.white,
  },
}))(TableCell);
