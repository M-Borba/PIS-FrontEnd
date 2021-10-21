import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

Switcher.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function Switcher({ onSwitch, isProjectView }) {
  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        Proyectos
        <Switch color="default" checked={!isProjectView} onChange={onSwitch} />
        Personas
      </Grid>
    </>
  );
}
