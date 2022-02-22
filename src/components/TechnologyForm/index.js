import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import MuiChip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import randomColor from "randomcolor";

import { useStyles } from "./styles";
import { COLORS, PERSON_LABELS } from "../../config/globalVariables";

TechnologyForm.propTypes = {
  defaultTechs: PropTypes.array,
  technologies: PropTypes.array,
  addTechnology: PropTypes.func,
  removeTechnology: PropTypes.func,
  setTechnologiesError: PropTypes.func,
  setAllErrors: PropTypes.func,
  error: PropTypes.string,
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
            <InputLabel id="technology-select">Tecnología</InputLabel>
            <Select
              label={PERSON_LABELS.TECNOLOGIAS}
              id="technology"
              labelId="technology-select"
              name="technology"
              onChange={handleChange}
              value={tech.technology}
            >
              {defaultTechs?.map((option, index) => (
                <MenuItem key={`default-tech-${index}`} value={option}>
                  {option}
                </MenuItem>
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
              label={PERSON_LABELS.SENIORITY}
              id="seniority"
              labelId="seniority-select"
              name="seniority"
              onChange={handleChange}
              value={tech.seniority}
            >
              <MenuItem value="senior">{PERSON_LABELS.SENIOR}</MenuItem>
              <MenuItem value="semi-senior">
                {PERSON_LABELS.SEMI_SENIOR}
              </MenuItem>
              <MenuItem value="junior">{PERSON_LABELS.JUNIOR}</MenuItem>
            </Select>
            <FormHelperText>{technologiesError?.seniority}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <IconButton
              style={{
                color: COLORS.backgroundBlack,
              }}
              onClick={addTechnology}
            >
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
  tech: PropTypes.array,
};
