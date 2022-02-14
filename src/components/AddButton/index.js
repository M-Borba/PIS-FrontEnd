import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

const AddButton = ({ variant, children, onClick, type, form }) => {
  const classes = useStyles();
  return (
    <Button
      classes={{ root: classes.buttonRoot }}
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
};
export default AddButton;
