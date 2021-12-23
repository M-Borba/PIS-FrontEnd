import React from "react";
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { useStyles } from "./styles";
import CardSelector from "../CardSelector";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";

AsignPersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  asign: propTypes.shape({
    roles: propTypes.array.isRequired,
    people: propTypes.array.isRequired,
    startDate: propTypes.string.isRequired,
    endDate: propTypes.string,
    hours: propTypes.number.isRequired,
    hoursType: propTypes.string.isRequired,
  }).isRequired,
  error: propTypes.string,
  title: propTypes.string,
  startDate: propTypes.string,
  endDate: propTypes.string,
};

export default function AsignPersonForm({
  title,
  onSubmit,
  onInputChange,
  asign,
  error,
  startDate,
  endDate,
}) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography component="p">
        {startDate} - {endDate}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card
              style={{ display: "flex", flexDirection: "column" }}
              component={Paper}
            >
              <CardHeader className={classes.cardHeader} title={"Personas"} />
              <List className={classes.list} dense component="div" role="list">
                {asign.people.map(([p, value]) => {
                  return (
                    <ListItem
                      key={p.id}
                      role="listitem"
                      button
                      onClick={() => {
                        onInputChange([p, value], "Personas");
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          style={{ color: "black" }}
                          id={p.id}
                          checked={value}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={p.full_name} />
                    </ListItem>
                  );
                })}
                <ListItem />
              </List>
            </Card>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <CardSelector
              name={"roles"}
              id={"roles"}
              title={"Rol"}
              list={asign.roles}
              onInputChange={onInputChange}
            />
          </Grid>
        </Grid>
        <Grid container my={5} spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="startDate"
              label="Inicio"
              type="date"
              id="startDate"
              value={asign.startDate}
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              name="endDate"
              label="Fin"
              type="date"
              id="endDate"
              value={asign.endDate || ""}
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="workingHours"
              label="Horas"
              type="number"
              id="workingHours"
              value={asign.hours}
              onChange={onInputChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 1, max: 168 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="hours-type">Tipo de Horas</InputLabel>
              <Select
                fullWidth
                required
                value={asign.hoursType}
                label="Tipo de Horas"
                id="hoursType"
                labelId="hours-type"
                onChange={onInputChange}
                name="hoursType"
              >
                <MenuItem value="weekly">Semanales</MenuItem>
                <MenuItem value="monthly">Mensuales</MenuItem>
              </Select>
            </FormControl>
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
    </div>
  );
}
