import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axios";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
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
import { useStyles } from "./styles";

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
    start_date: propTypes.string,
    end_date: propTypes.string,
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
        console.log(response.data.technologies);
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
    setProject((prev) => ({ ...prev, [type]: value }));
  };

  return (
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
              label="Nombre"
              name="name"
              value={project.name}
              onChange={handleChange}
              error={!!errors?.name}
              helperText={errors?.name?.[0]}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={!!errors?.project_type}>
              <InputLabel id="tipo">Tipo *</InputLabel>
              <Select
                fullWidth
                required
                label="Tipo"
                id="project_type"
                name="project_type"
                value={project.project_type}
                labelId="tipo"
                onChange={handleChange}
                name="project_type"
              >
                <MenuItem value="staff_augmentation">
                  Staff Augmentation
                </MenuItem>
                <MenuItem value="end_to_end">End to End</MenuItem>
                <MenuItem value="tercerizado">Tercerizado</MenuItem>
                <MenuItem value="hibrido">Hibrido</MenuItem>
              </Select>
              <FormHelperText>{errors?.project_type?.[0]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={!!errors?.project_state}>
              <InputLabel id="state-input">Estado *</InputLabel>
              <Select
                fullWidth
                required
                labelId="state-input"
                label="Estado"
                id="project_state"
                name="project_state"
                value={project.project_state}
                onChange={handleChange}
              >
                <MenuItem value="verde">Verde</MenuItem>
                <MenuItem value="amarillo">Amarillo</MenuItem>
                <MenuItem value="rojo">Rojo</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
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
              label="Descripción"
              name="description"
              multiline
              minRows={2}
              maxRows={3}
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
                label="technologies"
                id="technologies"
                name="technologies"
                renderValue={(selected) => selected.join(", ")}
                value={project.technologies}
                onChange={handleChange}
                MenuProps={{ classes: { list: classes.menuPaper } }}
              >
                {technologies?.map((t, index) => (
                  <MenuItem key={`item-${index}`} value={t.name}>
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
              label="Budget"
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
              helperText={errors?.budget?.[0]}
              isAllowed={({ value }) => value <= 1000000 && value >= 0}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="organization"
              type="text"
              label="Organización"
              name="organization"
              value={project.organization}
              onChange={handleChange}
              error={!!errors?.organization}
              helperText={errors?.organization?.[0]}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              required
              label="Inicio *"
              inputFormat="MM-DD-YYYY"
              value={project.start_date}
              onChange={(e) => handleDatesChange("start_date", e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="start_date"
                  fullWidth
                  variant="outlined"
                  error={!!errors?.start_date}
                  helperText={errors?.start_date?.[0]}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="Fin"
              inputFormat="MM-DD-YYYY"
              value={project.end_date}
              onChange={(e) => handleDatesChange("end_date", e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="end_date"
                  fullWidth
                  variant="outlined"
                  error={!!errors?.end_date}
                  helperText={errors?.end_date?.[0]}
                />
              )}
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
      </form>
    </div>
  );
}
