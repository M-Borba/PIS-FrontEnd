import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useStyles } from "./styles";

ProyectoForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  proyecto: propTypes.shape({
    name: propTypes.string,
    project_type: propTypes.string,
    project_state: propTypes.string,
    description: propTypes.string,
    budget: propTypes.number,
    start_date: propTypes.string,
    end_date: propTypes.string,
  }).isRequired,
  msg: propTypes.string,
  error: propTypes.string,
  title: propTypes.string,
};

export default function ProyectoForm({
  title,
  onSubmit,
  onInputChange,
  proyecto,
  error,
  msg,
}) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography className={classes.msg} component="h2">
        {msg}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          type="text"
          label="Nombre"
          name="name"
          value={proyecto.name}
          onChange={onInputChange}
          autoFocus
        />
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
          fullWidth
          required
          id="project_type"
          value={proyecto.project_type}
          labelId="tipo"
          onChange={onInputChange}
        >
          <MenuItem value={"staff_augmentation"}>Staff Augmentation</MenuItem>
          <MenuItem value={"end_to_end"}>End to End</MenuItem>
          <MenuItem value={"tercerizado"}>Tercerizado</MenuItem>
        </Select>
        <InputLabel id="estado">Estado</InputLabel>
        <Select
          fullWidth
          required
          id="project_state"
          value={proyecto.project_state}
          labelId="estado"
          onChange={onInputChange}
        >
          <MenuItem value={"verde"}>Verde</MenuItem>
          <MenuItem value={"amarillo"}>Amarillo</MenuItem>
          <MenuItem value={"rojo"}>Rojo</MenuItem>
          <MenuItem value={"upcomping"}>Upcomping</MenuItem>
        </Select>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          type="text"
          label="Descripcion"
          name="description"
          multiline
          maxRows={5}
          value={proyecto.description}
          onChange={onInputChange}
        />
        <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="budget"
          label="Budget"
          name="budget"
          value={proyecto.budget}
          onChange={onInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="start_date"
          label="Inicio"
          type="date"
          id="start_date"
          value={proyecto.start_date}
          onChange={onInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="end_date"
          label="Fin"
          type="date"
          id="end_date"
          value={proyecto.end_date}
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
          Guardar
        </Button>

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div>
  );
}
