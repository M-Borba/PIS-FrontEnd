import React from "react";
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";

import { useStyles } from "./styles";

FilterForm.propTypes = {
  onClear: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  project_type: propTypes.string,
  project_state: propTypes.string,
  organization: propTypes.string,
};
FilterForm.defaultProps = {
  project_state: "",
  project_type: "",
  organization: "",
};

export default function FilterForm({
  onClear,
  onInputChange,
  project_type,
  project_state,
  organization,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form className={classes.form} noValidate>
        <TextField
          fullWidth
          id="project_type"
          type="text"
          label="Tipo de proyecto"
          name="project_type"
          autoComplete="project_type"
          select
          value={project_type}
          onChange={onInputChange}
        >
          <MenuItem value="">Cualquiera</MenuItem>
          <MenuItem value="staff_augmentation">Staff Augmentation</MenuItem>
          <MenuItem value="end_to_end">End to End</MenuItem>
          <MenuItem value="tercerizado">Tercerizado</MenuItem>
          <MenuItem value="hibrido">Híbrido</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="text"
          label="Estado del proyecto"
          onChange={onInputChange}
          id="project_state"
          name="project_state"
          onChange={onInputChange}
          select
          value={project_state}
        >
          <MenuItem value="">Cualquiera</MenuItem>
          <MenuItem value="verde">Verde</MenuItem>
          <MenuItem value="amarillo">Amarillo</MenuItem>
          <MenuItem value="rojo">Rojo</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </TextField>
        <TextField
          fullWidth
          id="organization"
          type="text"
          label="Organización"
          name="organization"
          autoComplete="organization"
          value={organization}
          onChange={onInputChange}
          inputProps={{ maxLength: 50 }}
        />
        <Tooltip title="Limpiar filtros">
          <Button
            style={{
              color: "#ffffff",
              background: "#1c1c1c",
            }}
            variant="contained"
            className={classes.clear}
            onClick={onClear}
          >
            <HighlightOffIcon />
          </Button>
        </Tooltip>
      </form>
    </div>
  );
}
