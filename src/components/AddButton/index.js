import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const AddButton = ({ variant, children, onClick, type, form, styles }) => {
  const classes = useStyles();
  const styleObj = { buttonRoot: styles };
  const style = makeStyles(styleObj);
  const customClass = style();
  // console.log(customClass);
  return (
    <Button
      classes={{ root: classes.buttonRoot + " " + customClass.buttonRoot }}
      onClick={onClick}
      variant={variant}
      type={type}
      form={form}
    >
      {children}
    </Button>
  );
};

AddButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  form: PropTypes.string,
  styles: PropTypes.object,
};
export default AddButton;
