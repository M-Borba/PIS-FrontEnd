/**
 * Create person
 */

import React from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

InfoProyecto.propTypes = {
  projectData: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
    budget: propTypes.number,
    id: propTypes.number,
    start_date: propTypes.string,
    end_date: propTypes.string,
    technologies: propTypes.array,
    people: propTypes.array,
  }).isRequired,
  type: propTypes.string.isRequired,
  state: propTypes.string.isRequired,
};

export default function InfoProyecto({ projectData, type, state }) {
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h3" paragraph style={{ overflowWrap: "break-word" }}>
        {projectData.name}
      </Typography>
      <Divider />

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Descripcion
        </Typography>

        <Typography display="" variant="body2">
          {projectData.description}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Budget:{" "}
        </Typography>
        <Typography display="inline" variant="body2">
          {projectData.budget}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Tipo proyecto:{" "}
        </Typography>
        <Typography display="inline" variant="body2">
          {type}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Estado:{" "}
        </Typography>
        <Typography display="inline" variant="body2">
          {state}
        </Typography>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box mt={2}>
            <Typography variant="h6" display="inline" gutterBottom>
              Fecha Inicio:{" "}
            </Typography>
            <Typography display="inline" variant="body2">
              {projectData.start_date}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={2}>
            <Typography variant="h6" display="inline" gutterBottom>
              Fecha Fin:{" "}
            </Typography>
            <Typography display="inline" variant="body2">
              {projectData.end_date}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box mr={15} mt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Tecnologías</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                position: "relative",
                overflow: "auto",
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {projectData.technologies.map((technology) => {
                return (
                  <>
                    <ListItem key={technology} role="listitem">
                      <ListItemText primary={technology} />
                    </ListItem>
                  </>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mr={15} mt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Personas Asignadas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                // bgcolor: "rgb(240,240,240)",
                position: "relative",
                // overflow: "auto",
                maxHeight: 500,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {projectData.people.map((person) => {
                return (
                  <>
                    <ListItem key={person.id} role="listitem">
                      <ListItemText primary={person.full_name} />
                    </ListItem>
                  </>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
