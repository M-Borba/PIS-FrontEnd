import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosInstance } from "../../config/axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import MuiChip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useStyles } from "./styles";
import randomColor from "randomcolor";

export default function TechnologyForm({ }) {
  const classes = useStyles();
  const [defaultTechs, setDefaultTechs] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [value, setValue] = useState({ technology: "", seniority: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/technologies")
      .then((response) => {
        const techs = response.data.technologies?.map((t) => t.name);
        setDefaultTechs(techs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setErrors({});
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    const errors = {};
    if (!value.technology) {
      errors.technology = "No puede ser vacío";
    }
    if (!value.seniority) {
      errors.seniority = "No puede ser vacío";
    }
    if (Object.values(errors).length) {
      setErrors(errors);
      return;
    }

    const newDefaultTechs = defaultTechs.filter((t) => t !== value.technology);
    setDefaultTechs(newDefaultTechs);
    const { technology, seniority } = value;
    selectedTechs.push({
      type: [technology, seniority],
      color: randomColor({ luminosity: "light" }),
    });
    setValue({ technology: "", seniority: "" });
    setSelectedTechs(selectedTechs);
  };

  const handleDelete = (type) => {
    console.log(type);
    console.log(selectedTechs);
    const newSelectedTechs = selectedTechs.filter((t) => t.type[0] !== type[0]);
    setSelectedTechs(newSelectedTechs);
    defaultTechs.push(type[0]);
    setDefaultTechs(defaultTechs);
  };

  return (
    <Box id="technology-form" className={classes.container}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={5}>
          <FormControl
            variant="outlined"
            fullWidth
            error={!!errors?.technology}
          >
            <InputLabel id="technology-select">Tecnologia</InputLabel>

            <Select
              label="Tecnologia"
              id="technology"
              labelId="technology-select"
              name="technology"
              onChange={handleChange}
              value={value.technology}
            >
              {defaultTechs?.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.technology}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl variant="outlined" fullWidth error={!!errors?.seniority}>
            <InputLabel id="seniority-select">Seniority</InputLabel>

            <Select
              label="Seniority"
              id="seniority"
              labelId="seniority-select"
              name="seniority"
              onChange={handleChange}
              value={value.seniority}
            >
              <MenuItem value="senior">Senior</MenuItem>
              <MenuItem value="semi-senior">Semi senior</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
            </Select>
            <FormHelperText>{errors?.seniority}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2} alignItems="center" justifyContent="center">
          <IconButton fullWidth color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Grid container spacing={1}>
          {selectedTechs?.map((tech, index) => (
            <Grid key={`tech-${index}`} item>
              <Chip tech={tech} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const Chip = memo(({ onDelete, tech }) => {
  const capitalizeSeniority = {
    senior: "Senior",
    "semi-senior": "Semi senior",
    junior: "Junior",
  };

  const { color, type } = tech;

  return (
    <MuiChip
      style={{
        backgroundColor: color,
      }}
      label={`${type[0]} - ${capitalizeSeniority[type[1]]}`}
      variant="outlined"
      onDelete={() => onDelete(type)}
    />
  );
});

Chip.propTypes = {
  onDelete: PropTypes.func,
  tech: PropTypes.object,
};
