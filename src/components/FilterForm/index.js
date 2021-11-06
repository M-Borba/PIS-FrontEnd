import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

FilterForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  project_type: propTypes.string,
  project_state: propTypes.string,
  organization: propTypes.string,
};
FilterForm.defaultProps = {
  project_state: "",
  project_type: "",
  project_state: "",
  organization: "",
};

export default function FilterForm({
  onSubmit,
  onInputChange,
  project_type,
  project_state,
  organization,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6">Filtros</Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          required
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
        </TextField>
        <TextField
          required
          fullWidth
          type="text"
          label="Estado del projecto"
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
          <MenuItem value="upcomping">Upcomping</MenuItem>
        </TextField>
        <TextField
          required
          fullWidth
          id="organization"
          type="text"
          label="Organización"
          name="organization"
          autoComplete="organization"
          value={organization}
          onChange={onInputChange}
        />

        <Button
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Filtrar &ensp;
          <FilterAltIcon />
        </Button>
      </form>
    </div>
  );
}
