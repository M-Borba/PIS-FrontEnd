import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { axiosInstance } from "../../config/axios";
import { useStyles } from "./styles";
import TechnologyForm from "../TechnologyForm";

PersonForm.propTypes = {
  onSubmit: propTypes.func,
  setErrors: propTypes.func,
  setPerson: propTypes.func,
  person: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
    technologies: propTypes.array,
  }).isRequired,
  errors: propTypes.object,
  title: propTypes.string,
};

export default function PersonForm({
  title,
  onSubmit,
  person,
  setPerson,
  errors,
  setErrors,
}) {
  const classes = useStyles();
  const [tech, setTech] = useState({ technology: "", seniority: "" });
  const [technologiesError, setTechnologiesError] = useState({});
  const [defaultTechs, setDefaultTechs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/technologies")
      .then((response) => {
        const techs = response.data.technologies?.map((t) => t.name);
        const personTechs = person.technologies?.map((t) => t[0]);
        const filteredTechs = techs?.filter((t) => !personTechs.includes(t));
        setDefaultTechs(filteredTechs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onInputChange = (e) => {
    setTechnologiesError({});
    setErrors({});
    setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTechnology = () => {
    const errors = {};
    if (!tech.technology) {
      errors.technology = "No puede ser vacío";
    }
    if (!tech.seniority) {
      errors.seniority = "No puede ser vacío";
    }
    if (Object.values(errors).length) {
      setTechnologiesError(errors);
      return;
    }

    const newDefaultTechs = defaultTechs.filter((t) => t !== tech.technology);
    setDefaultTechs(newDefaultTechs);
    const { technology, seniority } = tech;
    const techs = person.technologies;
    techs.push([technology, seniority]);
    setTech({ technology: "", seniority: "" });
    setPerson((prev) => ({ ...prev, technologies: techs }));
  };

  const handleRemoveTechnology = (tech) => {
    const newSelectedTechs = person.technologies?.filter(
      (t) => t[0] !== tech[0]
    );
    setPerson((prev) => ({ ...prev, technologies: newSelectedTechs }));
    defaultTechs.push(tech[0]);
    setDefaultTechs(defaultTechs);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Grid container mt={3} spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="first_name"
              name="first_name"
              type="text"
              label="Nombre"
              name="first_name"
              value={person.first_name}
              onChange={onInputChange}
              error={!!errors?.first_name}
              helperText={errors?.first_name?.[0]}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="last_name"
              name="last_name"
              type="text"
              label="Apellidos"
              name="last_name"
              value={person.last_name}
              onChange={onInputChange}
              error={!!errors?.last_name}
              helperText={errors?.last_name?.[0]}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={person.email}
              onChange={onInputChange}
              error={!!errors?.email}
              helperText={errors?.email?.[0]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ min: 1, max: 168 }}
              variant="outlined"
              margin="normal"
              fullWidth
              name="working_hours"
              label="Horas Semanales"
              type="number"
              id="working_hours"
              value={person.working_hours}
              onChange={onInputChange}
              error={!!errors?.working_hours}
              helperText={errors?.working_hours?.[0]}
            />
          </Grid>
          <Grid item xs={12}>
            <TechnologyForm
              defaultTechs={defaultTechs}
              technologies={person.technologies}
              addTechnology={handleAddTechnology}
              removeTechnology={handleRemoveTechnology}
              error={errors?.technologies}
              setTechnologiesError={setTechnologiesError}
              technologiesError={technologiesError}
              setAllErrors={setErrors}
              tech={tech}
              setTech={setTech}
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
