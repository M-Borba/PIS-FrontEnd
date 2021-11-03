import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

FilterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  project_type: PropTypes.string,
};

export default function FilterForm({ onSubmit, project_type }) {
  const classes = useStyles();

  return (
    <div className={classes.paper} data-testid="login">
      <Typography component="h1" variant="h5">
        Filtros
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="project_type"
          type="text"
          label="tipo de proyecto"
          name="project_type"
          autoComplete="project_type"
          value={project_type}
          onChange={(e) => onInputChange(e)}
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
