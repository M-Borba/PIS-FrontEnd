import React, { useMemo } from "react";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MuiChip from "@material-ui/core/Chip";
import randomColor from "randomcolor";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";

import {
  TypographyData,
  TypographyHeader,
  TypographyLabel,
} from "./TypographyStyled";

InfoPersona.propTypes = {
  personData: propTypes.object.isRequired,
};

export default function InfoPersona({ personData }) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <PersonIcon fontSize="medium" />
        <TypographyHeader>{personData.fullName}</TypographyHeader>
      </div>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />
      <Box mt={3}>
        <TypographyLabel display="inline" variant="body1">
          Email:{" "}
        </TypographyLabel>
        <TypographyData display="inline" variant="body1">
          {personData.email}
        </TypographyData>
      </Box>
      <Box mt={3}>
        <TypographyLabel display="inline" variant="body1">
          Carga Horaria:{" "}
        </TypographyLabel>
        <TypographyData display="inline" variant="body1">
          {personData.cargaHoraria}
        </TypographyData>
      </Box>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />
      <Grid container spacing={2}>
        <Grid item>
          <TypographyLabel variant="body1" display="inline" gutterBottom>
            Tecnologías:
          </TypographyLabel>
        </Grid>
        <Grid item style={{ width: "100%", textAlign: "center" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {personData.technologies?.length != 0 ? (
              personData.technologies?.map((tech, index) => (
                <Grid key={`tech-${index}`} item>
                  <Chip tech={tech} />
                </Grid>
              ))
            ) : (
              <Grid style={{ margin: 20 }}>
                <TypographyData variant="body1" display="inline">
                  Aún no hay tecnologias asociadas
                </TypographyData>
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
