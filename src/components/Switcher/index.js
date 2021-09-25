import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

Switcher.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.boolean,
};

export default function Switcher({ onSwitch, isProjectView }) {
  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        Personas
        <Switch color="default" checked={!isProjectView} onChange={onSwitch} />
        Proyectos
      </Grid>
    </>
  );
}
