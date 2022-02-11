import React from "react";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import { useStyles } from "../../components/Switcher/styles";

Switcher.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function Switcher({ onSwitch, isProjectView }) {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#FAFAFA",
        alignContent: "center",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Switch
        color="primary"
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        checked={isProjectView}
        onChange={onSwitch}
      />
    </div>
  );
}
