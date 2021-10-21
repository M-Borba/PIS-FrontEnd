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
import ListSubheader from "@mui/material/ListSubheader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
    project_type: propTypes.string,
    project_state: propTypes.string,
    start_date: propTypes.string,
    end_date: propTypes.string,
  }).isRequired,
};

export default function InfoProyecto({ projectData }) {
  console.log(projectData);
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
          {projectData.project_type}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Estado:{" "}
        </Typography>
        <Typography display="inline" variant="body2">
          {projectData.project_state}
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
            <Typography>
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
                <li>
                  <ul>
                    <ListItem>
                      <ListItemText primary={"Ruby on Rails v3.1"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Java2"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Java3"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Java4"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Java5"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Java6"} />
                    </ListItem>
                  </ul>
                </li>
              </List>
            </Typography>
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
            <Typography>
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
                <li>
                  <ul>
                    <ListItem>
                      <ListItemText
                        primary={"Juan con nombre muy muy muy muy muy largo"}
                      />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan2"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan3"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan4"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan5"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan6"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan7"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan7"} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemText primary={"Juan6"} />
                    </ListItem>
                  </ul>
                </li>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
