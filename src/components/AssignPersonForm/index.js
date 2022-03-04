import React, { useState } from "react";
import propTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/lab";
import Box from "@mui/material/Box";
import ReactLoading from "react-loading";

import { useStyles } from "./styles";
import CardSelector from "../CardSelector";
import {
  BUTTON_LABELS,
  COLORS,
  DATE_FORMAT,
  PERSON_LABELS,
  PROJECT_LABELS,
} from "../../config/globalVariables";
import CustomButton from "../CustomButton";
import { rawDateToDateFormat } from "../../utils/utils";

AssignPersonForm.propTypes = {
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

export default function AssignPersonForm({
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
  const isLoaded = () => assign.people.length > 0 && assign.roles.length > 0;
  return (
    <>
      {isLoaded() ? (
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Typography component="p">
            {rawDateToDateFormat(startDate)} -{" "}
            {endDate
              ? rawDateToDateFormat(endDate)
              : PROJECT_LABELS.FECHA_INDEFINIDA}
          </Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CardSelector
                  list={assign.people}
                  title={PERSON_LABELS.PERSONAS}
                  onInputChange={onInputChange}
                  name={"personas"}
                  id={"personas"}
                />
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
            <Grid container my={2} spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  fullWidth
                  name="startDate"
                  value={assign.startDate}
                  maxDate={projectEndDate || null}
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
                  value={assign.endDate || null}
                  maxDate={projectEndDate || null}
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
                    <MenuItem value="weekly">
                      {PERSON_LABELS.SEMANALES}
                    </MenuItem>
                    <MenuItem value="monthly">
                      {PERSON_LABELS.MENSUALES}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <CustomButton type="submit" fullWidth variant="contained">
              {BUTTON_LABELS.SAVE}
            </CustomButton>
            <Typography className={classes.errorMsg} component="h2">
              {error}
            </Typography>
            <Box mt={1} />
          </form>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={classes.paper}
        >
          <ReactLoading type="cylon" color={COLORS.black} />
        </div>
      )}
    </>
  );
}
