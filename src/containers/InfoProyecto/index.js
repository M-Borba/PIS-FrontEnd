import React from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import moment from "moment";

import ListData from "./List";
import { renderColor } from "../../utils/utils.js";

InfoProyecto.propTypes = {
  projectData: propTypes.object.isRequired,
  type: propTypes.string,
  state: propTypes.string,
};

export default function InfoProyecto({ projectData, type, state }) {
  return (
    <div style={{ padding: 30 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <AssignmentIcon
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Typography
          variant="h4"
          style={{ marginLeft: 10, overflowWrap: "break-word" }}
        >
          {projectData.name}
        </Typography>
      </div>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box>
            <Typography
              style={{ fontWeight: 600 }}
              variant="body1"
              display="inline"
              gutterBottom
            >
              Organización:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {projectData.organization == ""
                ? "-"
                : projectData.organization ?? "-"}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography
              style={{ fontWeight: 600 }}
              variant="body1"
              display="inline"
              gutterBottom
            >
              Tipo proyecto:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {type}
            </Typography>
          </Box>

          <Box mt={2} style={{ display: "flex", gap: "0.5rem" }}>
            <Typography
              style={{ fontWeight: 600 }}
              variant="body1"
              display="inline"
              gutterBottom
            >
              Estado:{" "}
            </Typography>
            {renderColor(state)}
          </Box>

          <Box mt={2}>
            <Typography
              style={{ fontWeight: 600 }}
              variant="body1"
              display="inline"
              gutterBottom
            >
              Fecha Inicio:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {moment(projectData.start_date).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              style={{ fontWeight: 600 }}
              variant="body1"
              display="inline"
              gutterBottom
            >
              Fecha Fin:{" "}
            </Typography>
            {projectData.end_date ? (
              <Typography display="inline" variant="body1">
                {moment(projectData.end_date).format("DD/MM/YYYY")}
              </Typography>
            ) : (
              <Typography display="inline" variant="body1">
                Indefinida
              </Typography>
            )}
          </Box>

          <Box mt={2}>
            <Typography
              style={{ fontWeight: 600 }}
              variant="body1"
              gutterBottom
            >
              Descripción:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {projectData.description}
            </Typography>
          </Box>

          {projectData.budget ? (
            <Box mt={2}>
              <Typography
                style={{ fontWeight: 600 }}
                variant="body1"
                display="inline"
                gutterBottom
              >
                Budget:{" "}
              </Typography>
              <Typography display="inline" variant="body1">
                {projectData.budget}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Grid>

        <Grid item xs={6}>
          <Box>
            <ListData
              title="Tecnologías"
              type="tecnologías"
              data={projectData.technologies}
            />
          </Box>
          <Divider style={{ marginBottom: 15, marginTop: 15 }} />
          <Box>
            <ListData
              title="Personas Asignadas"
              type="personas"
              data={projectData.people}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
