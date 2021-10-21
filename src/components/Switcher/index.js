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
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Typography variant="body1" color="common.white">
          Proyectos
        </Typography>
        <Switch color="default" checked={!isProjectView} onChange={onSwitch} />
        <Typography variant="body1" color="common.white">
          Personas
        </Typography>

      </Grid>
    </>
  );
}
