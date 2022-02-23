import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

import { useStyles } from "./styles";
import CardSelector from "../CardSelector";
import {
  BUTTON_LABELS,
  PERSON_LABELS,
  PROJECT_LABELS,
} from "../../config/globalVariables";

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
            <CardSelector
              list={asign.people}
              title={PERSON_LABELS.PERSONAS}
              onInputChange={onInputChange}
              name={"personas"}
              id={"personas"}
            />
          </Grid>
          <Grid item xs={6}>
            <CardSelector
              name={"roles"}
              id={"roles"}
              title={PERSON_LABELS.ROL}
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
              label={PROJECT_LABELS.FECHA_INICIO}
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
              label={PROJECT_LABELS.FECHA_FIN}
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
              label={PERSON_LABELS.HORAS}
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
                label={PERSON_LABELS.TIPO_CARGA_HORARIA}
                id="hoursType"
                labelId="hours-type"
                onChange={onInputChange}
                name="hoursType"
              >
                <MenuItem value="weekly">{PERSON_LABELS.SEMANALES}</MenuItem>
                <MenuItem value="monthly">{PERSON_LABELS.MENSUALES}</MenuItem>
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
          {BUTTON_LABELS.SAVE}
        </Button>

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5} />
      </form>
    </div>
  );
}
