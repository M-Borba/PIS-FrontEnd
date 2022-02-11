import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

const AddButton = ({ variant, children, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      classes={{ root: classes.buttonRoot }}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </Button>
  );
};

AddButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};
export default AddButton;
