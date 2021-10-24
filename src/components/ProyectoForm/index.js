import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
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
    people: propTypes.array,
    organization: propTypes.string,
  }).isRequired,
  title: propTypes.string,
};

export default function ProyectoForm({
  title,
  onSubmit,
  onInputChange,
  proyecto,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={{ xs: 2 }}>
          <Grid item xs={6} mt={1}>
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
              inputProps={{ maxLength: 40 }}
            />
          </Grid>

          <Grid item xs={6} mt={1}>
            <TextField
              inputProps={{ min: 1 }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="budget"
              type="number"
              label="Budget"
              name="budget"
              value={proyecto.budget}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="tipo">Tipo *</InputLabel>
            <Select
              fullWidth
              required
              id="project_type"
              value={proyecto.project_type}
              labelId="tipo"
              onChange={onInputChange}
              name="project_type"
            >
              <MenuItem value={"staff_augmentation"}>
                Staff Augmentation
              </MenuItem>
              <MenuItem value={"end_to_end"}>End to End</MenuItem>
              <MenuItem value={"tercerizado"}>Tercerizado</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="estado">Estado *</InputLabel>
            <Select
              fullWidth
              required
              id="project_state"
              value={proyecto.project_state}
              labelId="estado"
              onChange={onInputChange}
              name="project_state"
            >
              <MenuItem value={"verde"}>Verde</MenuItem>
              <MenuItem value={"amarillo"}>Amarillo</MenuItem>
              <MenuItem value={"rojo"}>Rojo</MenuItem>
              <MenuItem value={"upcomping"}>Upcomping</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <TextField
              InputProps={{ inputProps: { max: "9999-12-31" } }} //https://github.com/mui-org/material-ui/issues/10675
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="start_date"
              label="Inicio"
              type="date"
              id="start_date"
              value={proyecto.start_date}
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              InputProps={{ inputProps: { max: "9999-12-31" } }} //https://github.com/mui-org/material-ui/issues/10675
              variant="outlined"
              margin="normal"
              fullWidth
              name="end_date"
              label="Fin"
              type="date"
              id="end_date"
              value={proyecto.end_date}
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organization"
              type="text"
              label="Organización"
              name="organization"
              value={proyecto.organization}
              onChange={onInputChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              type="text"
              label="Descripción"
              name="description"
              multiline
              maxRows={5}
              value={proyecto.description}
              onChange={onInputChange}
            />
          </Grid>
        </Grid>

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

        <Box mt={5}></Box>
      </form>
    </div>
  );
}
