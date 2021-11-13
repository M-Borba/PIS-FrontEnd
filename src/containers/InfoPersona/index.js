import React, { useMemo } from "react";
import propTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MuiChip from "@material-ui/core/Chip";
import randomColor from "randomcolor";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';

InfoPersona.propTypes = {
  personData: propTypes.object.isRequired,
};

export default function InfoPersona({ personData }) {

  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: 16 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <PersonIcon style={{
          width: 50,
          height: 50
        }} />
        <Typography variant="h4" style={{ marginLeft: 10, overflowWrap: "break-word" }}>
          {personData.fullName}
        </Typography>
      </div>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />
      <Box mt={3}>
        <Typography style={{ fontWeight: 600 }} display="inline" variant="body1">
          Email:{" "}
        </Typography>
        <Typography display="inline" variant="body1">
          {personData.email}
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography style={{ fontWeight: 600 }} display="inline" variant="body1">
          Carga Horaria:{" "}
        </Typography>
        <Typography display="inline" variant="body1">
          {personData.cargaHoraria}
        </Typography>
      </Box>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />
      <Grid container spacing={2}>
        <Grid item>
          <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
            Tecnologías:
          </Typography>
        </Grid>
        <Grid item style={{ width: "100%", textAlign: "center" }}>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} >
            {personData.technologies?.length != 0 ? (
              personData.technologies?.map((tech, index) => (
                <Grid key={`tech-${index}`} item>
                  <Chip tech={tech} />
                </Grid>
              ))
            ) : (
              <Grid style={{ margin: 20 }}>
                <Typography variant="body1" display="inline">
                  Aún no hay tecnologias asociadas
                </Typography>
              </Grid>
            )}

          </Grid>
        </Grid>
      </Grid>
    </Box>
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
