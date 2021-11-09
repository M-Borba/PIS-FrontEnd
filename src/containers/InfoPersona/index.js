/**
 * Create person
 */

import React from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

InfoPersona.propTypes = {
  personData: propTypes.shape({
    cargaHoraria: propTypes.number.isRequired,
    email: propTypes.string.isRequired,
    fullName: propTypes.string.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    tag: propTypes.string,
    technologies: propTypes.array,
  }).isRequired,
};

export default function InfoPersona({ personData }) {
  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h3" paragraph style={{ overflowWrap: "break-word" }}>
        {personData.fullName}
      </Typography>
      <Divider />

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Email
        </Typography>
        <Typography display="" variant="h7">
          {personData.email}
        </Typography>
      </Box>

      {personData.tag ? (
        <Box mt={2}>
          <Typography variant="h6" display="inline" gutterBottom>
            Etiquetas:{" "}
          </Typography>
          <Typography display="inline" variant="h7">
            {personData.tag}
          </Typography>
        </Box>
      ) : (
        " "
      )}


      <Box mt={2}>
        <Typography variant="h6" display="inline" gutterBottom>
          Carga Horaria:{" "}
        </Typography>
        <Typography display="inline" variant="h7">
          {personData.cargaHoraria}
        </Typography>
      </Box>

      {personData.technologies.length != 0 ? (
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
                {personData.technologies.map((technology) => {
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
      ) : (
        " "
      )}

    </div>
  );
}
