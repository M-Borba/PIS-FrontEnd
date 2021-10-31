import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@material-ui/core/Typography";
import MuiChip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useStyles } from "./styles";
import randomColor from "randomcolor";

TechnologyForm.propTypes = {
  defaultTechs: PropTypes.array,
  technologies: PropTypes.array,
  addTechnology: PropTypes.func,
  removeTechnology: PropTypes.func,
  setTechnologiesError: PropTypes.func,
  setAllErrors: PropTypes.func,
  error: PropTypes.array,
  technologiesError: PropTypes.object,
  tech: PropTypes.object,
  setTech: PropTypes.func,
};

export default function TechnologyForm({
  defaultTechs,
  technologies,
  addTechnology,
  removeTechnology,
  setTechnologiesError,
  technologiesError,
  error,
  setAllErrors,
  tech,
  setTech,
}) {
  const classes = useStyles();

  const handleChange = (e) => {
    setAllErrors({});
    setTechnologiesError({});
    setTech((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box id="technology-form" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <FormControl
            variant="outlined"
            fullWidth
            error={!!technologiesError?.technology}
          >
            <InputLabel id="technology-select">Tecnologia</InputLabel>
            <Select
              label="Tecnologia"
              id="technology"
              labelId="technology-select"
              name="technology"
              onChange={handleChange}
              value={tech.technology}
            >
              {defaultTechs?.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{technologiesError?.technology}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl
            variant="outlined"
            fullWidth
            error={!!technologiesError?.seniority}
          >
            <InputLabel id="seniority-select">Seniority</InputLabel>
            <Select
              label="Seniority"
              id="seniority"
              labelId="seniority-select"
              name="seniority"
              onChange={handleChange}
              value={tech.seniority}
            >
              <MenuItem value="senior">Senior</MenuItem>
              <MenuItem value="semi-senior">Semi senior</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
            </Select>
            <FormHelperText>{technologiesError?.seniority}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center" mt={1}>
            <IconButton fullWidth color="primary" onClick={addTechnology}>
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Typography color="error">{error}</Typography>
      </Box>
      <Box mt={2}>
        <Grid container spacing={1}>
          {technologies?.map((tech, index) => (
            <Grid key={`tech-${index}`} item>
              <Chip tech={tech} onDelete={removeTechnology} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const Chip = ({ onDelete, tech }) => {
  const color = useMemo(() => randomColor({ luminosity: "light" }), [tech]);
  const capitalizeSeniority = {
    senior: "Senior",
    "semi-senior": "Semi senior",
    junior: "Junior",
  };

  return (
    <MuiChip
      style={{ backgroundColor: color }}
      label={`${tech[0]} - ${capitalizeSeniority[tech[1]]}`}
      variant="outlined"
      onDelete={() => onDelete(tech)}
    />
  );
};

Chip.propTypes = {
  onDelete: PropTypes.func,
  tech: PropTypes.object,
};
