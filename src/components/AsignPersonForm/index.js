import React, { useState } from "react";
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
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import moment from "moment";

import { useStyles } from "./styles";
import CardSelector from "../CardSelector";
import {
  BUTTON_LABELS,
  DATE_FORMAT,
  PERSON_LABELS,
  PROJECT_LABELS,
} from "../../config/globalVariables";
import { DatePicker } from "@mui/lab";

AsignPersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  assign: propTypes.shape({
    roles: propTypes.array.isRequired,
    people: propTypes.array.isRequired,
    startDate: propTypes.object.isRequired,
    endDate: propTypes.object,
    hours: propTypes.number.isRequired,
    hoursType: propTypes.string.isRequired,
  }).isRequired,
  error: propTypes.string,
  title: propTypes.string,
  startDate: propTypes.object,
  endDate: propTypes.object,
  setAssign: propTypes.func,
};

export default function AsignPersonForm({
  title,
  onSubmit,
  onInputChange,
  assign,
  error,
  startDate,
  endDate,
  setAssign,
}) {
  const classes = useStyles();
  const [projectStartDate, setProjectStartDate] = useState(assign.startDate);
  const [projectEndDate, setProjectEndDate] = useState(assign.endDate);
  return (
    assign && (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Typography component="p">
          {moment(startDate).format(DATE_FORMAT)} -{" "}
          {moment(endDate).format(DATE_FORMAT)}
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card
                style={{ display: "flex", flexDirection: "column" }}
                component={Paper}
              >
                <CardHeader className={classes.cardHeader} title={"Personas"} />
                <List
                  className={classes.list}
                  dense
                  component="div"
                  role="list"
                >
                  {assign.people.map(([p, value]) => {
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
                title={PERSON_LABELS.ROL}
                list={assign.roles}
                onInputChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Grid container my={5} spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                fullWidth
                name="startDate"
                value={assign.startDate}
                maxDate={projectEndDate}
                minDate={projectStartDate}
                onChange={(e) => {
                  onInputChange(e, "start_date");
                  setAssign({ ...assign, startDate: e });
                }}
                disableMaskedInput
                inputFormat={DATE_FORMAT}
                PaperProps={{
                  style: {
                    borderRadius: "15px",
                  },
                }}
                inputProps={{
                  disabled: true,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="startDate"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                    label={PROJECT_LABELS.FECHA_INICIO}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                fullWidth
                name="endDate"
                value={assign.endDate}
                maxDate={projectEndDate}
                minDate={projectStartDate}
                onChange={(e) => {
                  onInputChange(e, "end_date");
                  setAssign({ ...assign, endDate: e });
                }}
                disableMaskedInput
                inputFormat={DATE_FORMAT}
                PaperProps={{
                  style: {
                    borderRadius: "15px",
                  },
                }}
                inputProps={{
                  disabled: true,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="endDate"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                    label={PROJECT_LABELS.FECHA_FIN}
                  />
                )}
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
                value={assign.hours}
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
                  value={assign.hoursType}
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
    )
  );
}
