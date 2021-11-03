import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

FilterForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  project_type: propTypes.string,
  project_state: propTypes.string,
  organization: propTypes.string,
  technologies: propTypes.arrayOf(propTypes.string),
};
FilterForm.defaultProps = {
  project_state: "-",
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
  technologies,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6">Filtros</Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="project_type"
          type="text"
          label="Tipo de proyecto"
          name="project_type"
          autoComplete="project_type"
          value={project_type}
          onChange={onInputChange}
          autoFocus
        />
        <Select
          label="Estado del proyecto"
          id="project_state"
          labelId="project_state"
          name="project_state"
          onChange={onInputChange}
          value={project_state}
          className={classes.comboBox}
        >
          <MenuItem value="-">-</MenuItem>
          <MenuItem value="verde">Verde</MenuItem>
          <MenuItem value="amarillo">Amarillo</MenuItem>
          <MenuItem value="rojo">Rojo</MenuItem>
          <MenuItem value="upcomping">Upcomping</MenuItem>
        </Select>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="organization"
          type="text"
          label="Organización"
          name="organization"
          autoComplete="organization"
          value={organization}
          onChange={onInputChange}
          autoFocus
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

        <Box mt={5}></Box>
      </form>
    </div>
  );
}
