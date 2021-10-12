import React, { useState } from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@mui/material/Grid';
import Typography from "@material-ui/core/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./styles";


AsignPersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  project: propTypes.shape({
    id: propTypes.number,
    startDate: propTypes.string,
    endDate: propTypes.string,
  }).isRequired,
  people: propTypes.array.isRequired,
  msg: propTypes.string,
  error: propTypes.string,
  title: propTypes.string,
};

export default function AsignPersonForm({
  //people,
  title,
  onSubmit,
  onInputChange,
  project, //TO DO: usar end date y start date
  people,
  error,
  msg,
}) {

  const classes = useStyles();

  const [selected, setSelected] = useState([]);
  const role = [
    "Developer",
    "PM",
    "Tester",
    "Architect",
    "Analyst",
    "Designer"
  ]
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 400,
        width: 250
      }
    }
  };

  let handlePeopleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === people.length ? [] : people);
      return;
    }
    setSelected(value);
  };

  let handleRoleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === role.length ? [] : role);
      return;
    }
    setSelected(value);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography className={classes.msg} component="h2">
        {msg}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={6}>
            <InputLabel id="Personas">Personas</InputLabel>
            <Select
              labelId="Personas" // TO DO: ARREGLAR LABEL, NO SE VISUALIZA BIEN
              label={"Personas"}
              fullWidth
              multiple
              value={selected}
              onChange={handlePeopleChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {people.map((person) => (
                <MenuItem key={person} value={person}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(person) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} secondary={"EMAIL ACA"} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="role">Rol</InputLabel>
            <Select
              labelId="role" // TO DO: ARREGLAR LABEL, NO SE VISUALIZA BIEN
              label={"Rol"}
              fullWidth
              multiple
              value={selected}
              onChange={handleRoleChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {role.map((role) => (
                <MenuItem key={role} value={role}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(role) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={role} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="start_date"
              label="Inicio"
              type="date"
              id="start_date"
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="end_date"
              label="Fin"
              type="date"
              id="end_date"
              InputLabelProps={{ shrink: true }}
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

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div >
  );
}
