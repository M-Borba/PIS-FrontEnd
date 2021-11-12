/**
 * Create person
 */

import React, { useMemo } from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MuiChip from "@material-ui/core/Chip";
import randomColor from "randomcolor";
import Divider from "@mui/material/Divider";

InfoPersona.propTypes = {
  personData: propTypes.object.isRequired,
};

export default function InfoPersona({ personData }) {
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h3" paragraph style={{ overflowWrap: "break-word" }}>
        {personData.fullName}
      </Typography>
      <Divider />

      <Box mt={3}>
        <Typography variant="h6" display="inline" gutterBottom>
          Email:{" "}
        </Typography>
        <Typography display="inline" variant="body1">
          {personData.email}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Carga Horaria:{" "}
        </Typography>
        <Typography display="inline" variant="body1">
          {personData.cargaHoraria}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Tecnologías:
        </Typography>
        <Grid container spacing={2}>
          {personData.technologies?.length != 0 ? (
            personData.technologies?.map((tech, index) => (
              <Grid key={`tech-${index}`} item>
                <Chip tech={tech} />
              </Grid>
            ))
          ) : (
            <Box style={{ margin: 20 }}>
              <Typography variant="body1" display="inline">
                Aún no hay tecnologias asociadas
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </div>
  );
}

const Chip = ({ tech }) => {
  const color = useMemo(() => randomColor({ luminosity: "light" }), [tech]);
  const capitalizeSeniority = {
    senior: "Senior",
    "semi-senior": "Semi Senior",
    junior: "Junior",
  };

  return (
    <MuiChip
      style={{ backgroundColor: color }}
      label={`${tech[0]} - ${capitalizeSeniority[tech[1]]}`}
      variant="outlined"
    />
  );
};

Chip.propTypes = {
  tech: propTypes.array,
};
