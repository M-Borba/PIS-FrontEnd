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
  proyecto: propTypes.shape({
    id: propTypes.number,
  }).isRequired,
  msg: propTypes.string,
  error: propTypes.string,
  title: propTypes.string,
};

export default function AsignPersonForm({
  //people,
  title,
  onSubmit,
  onInputChange,
  proyecto, //TO DO: usar end date y start date
  error,
  msg,
}) {
  const classes = useStyles();

  const [selected, setSelected] = useState([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 400,
        width: 250
      }
    }
  };

  const options = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder"
  ];


  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
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
        <Grid container spacing={{ xs: 2 }}>
          <Grid item xs={6}>
            <InputLabel id="Personas">Personas</InputLabel>
            <Select
              labelId="Personas" // TO DO: ARREGLAR LABEL, NO SE VISUALIZA BIEN
              label={"Personas"}
              fullWidth
              multiple
              value={selected}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} secondary={"EMAIL ACA"} />
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
              id="role"
              type="text"
              label="Rol (Uno por linea)"
              name="role"
              multiline
              rows={5}
              onChange={onInputChange}
            />
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
