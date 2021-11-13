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
import AssignmentIcon from '@mui/icons-material/Assignment';

InfoProyecto.propTypes = {
  projectData: propTypes.array.isRequired,
  type: propTypes.string,
  state: propTypes.string,
};

export default function InfoProyecto({ projectData, type, state }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <AssignmentIcon style={{
          width: 50,
          height: 50
        }} />
        <Typography variant="h4" style={{ marginLeft: 10, overflowWrap: "break-word" }}>
          {projectData.name}
        </Typography>
      </div>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box>
            <Typography style={{ fontWeight: 600 }} variant="body1" gutterBottom>
              Descripción:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {projectData.description}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
              Organización:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {projectData.organization == ""
                ? "-"
                : projectData.organization ?? "-"}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
              Budget:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {projectData.budget == 0 ? "-" : projectData.budget ?? "-"}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
              Tipo proyecto:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {type}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
              Estado:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {state}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
              Fecha Inicio:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {projectData.start_date}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography style={{ fontWeight: 600 }} variant="body1" display="inline" gutterBottom>
              Fecha Fin:{" "}
            </Typography>
            {projectData.end_date ? (
              <Typography display="inline" variant="body1">
                {projectData.end_date}
              </Typography>
            ) : (
              <Typography display="inline" variant="body1">
                Indefinida
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={6}>

          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: 600 }} variant="body1">Tecnologías</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 145,
                    "& ul": { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {projectData.technologies.length != 0 ? (
                    projectData.technologies.map((technology, index) => {
                      return (
                        <>
                          <ListItem key={technology + index} role="listitem">
                            <ListItemText primary={technology} />
                          </ListItem>
                        </>
                      );
                    })
                  ) : (
                    <Box style={{ paddingTop: 20 }}>
                      <Typography variant="button" display="block" gutterBottom>
                        Aún no hay tecnologías asociadas
                      </Typography>
                    </Box>
                  )}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Divider style={{ marginBottom: 15, marginTop: 15 }} />

          <Box >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: 600 }} variant="body1">Personas Asignadas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    // bgcolor: "rgb(240,240,240)",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 370,
                    "& ul": { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {projectData.people.length != 0 ? (
                    projectData.people.map((person) => {
                      return (
                        <>
                          <ListItem key={person.id} role="listitem">
                            <ListItemText primary={person.full_name} />
                          </ListItem>
                        </>
                      );
                    })
                  ) : (
                    <Box style={{ paddingTop: 20 }}>
                      <Typography variant="button" display="block" gutterBottom>
                        Aún no hay personas asociadas
                      </Typography>
                    </Box>
                  )}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

      </Grid>
    </div>
  );
}
