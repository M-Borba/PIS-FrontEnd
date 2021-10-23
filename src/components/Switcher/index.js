import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

Switcher.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function Switcher({ onSwitch, isProjectView }) {
  return (
    <div style={{ margin: "1vh 1vh 0 1vh" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0}
      >
        <Typography variant="body2" color="common.white">
          Proyecto
        </Typography>
        <Switch color="default" checked={isProjectView} onChange={onSwitch} />
        <Typography variant="body2" color="common.white">
          Personas
        </Typography>
      </Grid>
    </div>
  );
}
