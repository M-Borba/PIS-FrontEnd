import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const CustomButton = ({
  variant,
  children,
  onClick,
  type,
  form,
  styles,
  redButton,
}) => {
  const classes = useStyles();
  const styleObj = { buttonRoot: styles };
  redButton &&
    (styleObj.buttonRoot = {
      ...styleObj.buttonRoot,
      backgroundColor: "#c21321",
      "&:hover": { backgroundColor: "#990f1b" },
    });
  const style = makeStyles(styleObj);
  const customClass = style();
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

CustomButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  form: PropTypes.string,
  styles: PropTypes.object,
  redButton: PropTypes.bool,
};
export default CustomButton;
