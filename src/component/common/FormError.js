import * as React from "react";
import Typography from "@material-ui/core/Typography";

class FormError extends React.Component {

  render() {
    const {errorMessage} = this.props;
    return <Typography
      style={{
        color: 'red',
        margin: 'auto',
        fontSize: '1.2em'
      }}>{errorMessage}</Typography>
  }
}

export default FormError;