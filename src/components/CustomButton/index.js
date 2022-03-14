import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import { COLORS } from "../../config/globalVariables";

const CustomButton = ({
  variant,
  children,
  onClick,
  type,
  form,
  styles,
  redButton,
  blackButton,
  fullWidth,
  className,
}) => {
  const classes = useStyles();
  const styleObj = { buttonRoot: styles };
  redButton &&
    (styleObj.buttonRoot = {
      ...styleObj.buttonRoot,
      backgroundColor: COLORS.buttonRed,
      "&:hover": { backgroundColor: COLORS.buttonRedHover },
    });
  blackButton &&
    (styleObj.buttonRoot = {
      ...styleObj,
      backgroundColor: COLORS.backgroundDarkestGrey,
      "&:hover": { backgroundColor: COLORS.black },
    });
  const style = makeStyles(styleObj);
  const customClass = style();
  return (
    <Button
      classes={{ root: classes.buttonRoot + " " + customClass.buttonRoot }}
      className={className}
      onClick={onClick}
      variant={variant}
      type={type}
      form={form}
      fullWidth={fullWidth}
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
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  blackButton: PropTypes.bool,
};
export default CustomButton;
