import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import NumberFormat from "react-number-format";
import Divider from "@mui/material/Divider";
import Box from "@material-ui/core/Box";
import { DatePicker } from "@mui/lab";

import { useStyles } from "./styles";
import { axiosInstance } from "../../config/axios";
import {
  BUTTON_LABELS,
  DATE_FORMAT,
  PROJECT_LABELS,
} from "../../config/globalVariables";
import CustomButton from "../CustomButton";
import { renderColorMenuItems, renderTipoMenuItems } from "../../utils/utils";

ProyectoForm.propTypes = {
  onSubmit: propTypes.func,
  setErrors: propTypes.func,
  setProject: propTypes.func,
  project: propTypes.shape({
    name: propTypes.string,
    project_type: propTypes.string,
    project_state: propTypes.string,
    description: propTypes.string,
    budget: propTypes.oneOfType([propTypes.number, propTypes.string]),
    start_date: propTypes.object,
    end_date: propTypes.object,
    people: propTypes.array,
    organization: propTypes.string,
    technologies: propTypes.array,
  }).isRequired,
  title: propTypes.string,
  errors: propTypes.object,
};

export default function ProyectoForm({
  title,
  onSubmit,
  setErrors,
  project,
  errors,
  setProject,
}) {
  const classes = useStyles();
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/technologies")
      .then((response) => {
        setTechnologies(response.data.technologies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setErrors({});
    setProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBugdetChange = (e) => {
    setErrors({});
    setProject((prev) => ({ ...prev, budget: e.floatValue }));
  };

  const handleDatesChange = (type, value) => {
    setErrors({});
    setProject((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    project && (
      <div className={classes.paper}>
        <Box style={{ width: "100%", textAlign: "center" }}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Divider style={{ marginBottom: 15, marginTop: 15 }} />
        </Box>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                fullWidth
                required
                id="name"
                type="text"
                label={PROJECT_LABELS.NOMBRE}
                name="name"
                value={project.name}
                onChange={handleChange}
                error={!!errors?.name}
                helperText={errors?.name?.[0]}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl required fullWidth error={!!errors?.project_type}>
                <InputLabel id="tipo">{PROJECT_LABELS.TIPO}</InputLabel>
                <Select
                  fullWidth
                  required
                  label={PROJECT_LABELS.TIPO}
                  id="project_type"
                  name="project_type"
                  value={project.project_type}
                  labelId="tipo"
                  onChange={handleChange}
                >
                  {renderTipoMenuItems()}
                </Select>
                <FormHelperText>{errors?.project_type?.[0]}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl required fullWidth error={!!errors?.project_state}>
                <InputLabel id="state-input">
                  {PROJECT_LABELS.ESTADO}
                </InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="state-input"
                  label={PROJECT_LABELS.ESTADO}
                  id="project_state"
                  name="project_state"
                  value={project.project_state}
                  onChange={handleChange}
                >
                  {renderColorMenuItems()}
                </Select>
                <FormHelperText>{errors?.project_state?.[0]}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                required
                id="description"
                type="text"
                label={PROJECT_LABELS.DESCRIPCION}
                name="description"
                multiline
                InputProps={{
                  style: {
                    height: "fit-content",
                  },
                }}
                minRows={2}
                maxRows={10}
                value={project.description}
                onChange={handleChange}
                error={!!errors?.description}
                helperText={errors?.description?.[0]}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors?.technologies}>
                <InputLabel id="technologies-input">Tecnología</InputLabel>
                <Select
                  fullWidth
                  multiple
                  labelId="technologies-input"
                  label={PROJECT_LABELS.TECNOLOGIAS}
                  id="technologies"
                  name="technologies"
                  renderValue={(selected) => selected.join(", ")}
                  value={project.technologies}
                  onChange={handleChange}
                  MenuProps={{ classes: { list: classes.menuPaper } }}
                >
                  {technologies?.map((t) => (
                    <MenuItem key={`item-${t.name}`} value={t.name}>
                      <Checkbox
                        checked={project.technologies?.indexOf(t.name) > -1}
                      />
                      <ListItemText primary={t.name} />
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors?.technologies?.[0]}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <NumberFormat
                variant="outlined"
                label={PROJECT_LABELS.BUDGET}
                fullWidth
                value={project.budget}
                id="budget"
                name="budget"
                error={!!errors?.budget}
                helperText={errors?.budget?.[0]}
                type="text"
                customInput={TextField}
                thousandSeparator="."
                onValueChange={handleBugdetChange}
                decimalSeparator=","
                isAllowed={({ value }) => value <= 1000000 && value >= 0}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="organization"
                type="text"
                label={PROJECT_LABELS.ORGANIZACION}
                name="organization"
                value={project.organization}
                onChange={handleChange}
                error={!!errors?.organization}
                helperText={errors?.organization?.[0]}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                fullWidth
                required
                value={project.start_date}
                onChange={(e) => handleDatesChange("start_date", e)}
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
                    name="start_date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                    label={PROJECT_LABELS.FECHA_INICIO}
                    error={!!errors?.start_date || !!errors?.end_date}
                    helperText={errors?.start_date?.[0]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                fullWidth
                required
                id="fechaFin"
                value={project.end_date}
                onChange={(e) => handleDatesChange("end_date", e)}
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
                    name="end_date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                    label={PROJECT_LABELS.FECHA_FIN}
                    error={!!errors?.end_date}
                    helperText={errors?.end_date?.[0]}
                  />
                )}
              />
            </Grid>
          </Grid>
          <CustomButton
            role="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {BUTTON_LABELS.SAVE}
          </CustomButton>
        </form>
      </div>
    )
  );
}
