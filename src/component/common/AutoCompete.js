import React from 'react';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';

const suggestions = [
  {label: 'Afghanistan'},
  {label: 'Aland Islands'},
  {label: 'Albania'},
  {label: 'Algeria'},
  {label: 'American Samoa'},
  {label: 'Andorra'},
  {label: 'Angola'},
  {label: 'Anguilla'},
  {label: 'Antarctica'},
  {label: 'Antigua and Barbuda'},
  {label: 'Argentina'},
  {label: 'Armenia'},
  {label: 'Aruba'},
  {label: 'Australia'},
  {label: 'Austria'},
  {label: 'Azerbaijan'},
  {label: 'Bahamas'},
  {label: 'Bahrain'},
  {label: 'Bangladesh'},
  {label: 'Barbados'},
  {label: 'Belarus'},
  {label: 'Belgium'},
  {label: 'Belize'},
  {label: 'Benin'},
  {label: 'Bermuda'},
  {label: 'Bhutan'},
  {label: 'Bolivia, Plurinational State of'},
  {label: 'Bonaire, Sint Eustatius and Saba'},
  {label: 'Bosnia and Herzegovina'},
  {label: 'Botswana'},
  {label: 'Bouvet Island'},
  {label: 'Brazil'},
  {label: 'British Indian Ocean Territory'},
  {label: 'Brunei Darussalam'},
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography  {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={props.selectProps.classes.chip}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class AutoCompete extends React.Component {
  render() {
    const {
      classes, theme, suggestions,
      placeholder, onChange, value
    } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Label',
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={suggestions}
            components={components}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isMulti
          />
        </NoSsr>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(AutoCompete);