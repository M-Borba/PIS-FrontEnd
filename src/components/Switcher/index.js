import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
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
        // margin: "1vh 1vh 0 1vh",
        backgroundColor: "#FAFAFA",
        alignContent: "center",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {/*<Grid*/}
      {/*  container*/}
      {/*  direction="row"*/}
      {/*  alignItems="center"*/}
      {/*  justifyContent="center"*/}
      {/*  spacing={0}*/}
      {/*>*/}
      {/*<Typography variant="body2" color="common.white">*/}
      {/*  Proyectos*/}
      {/*</Typography>*/}
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
      {/*<Typography variant="body2" color="common.white">*/}
      {/*  Personas*/}
      {/*</Typography>*/}
      {/*</Grid>*/}
    </div>
  );
}
