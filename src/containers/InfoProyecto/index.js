import React from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import moment from "moment";

InfoProyecto.propTypes = {
  projectData: propTypes.object.isRequired,
  type: propTypes.string,
  state: propTypes.string,
};

export default function InfoProyecto({ projectData, type, state }) {
  const renderColor = () => {
    let color = "";
    switch (state) {
      case "Verde":
        color = "#7EDE6D";
        break;
      case "Rojo":
        color = "#E87272";
        break;
      case "Amarillo":
        color = "#FAE269";
        break;
      case "Upcoming":
        color = "#B0CFCB";
        break;
    }
    return (
      <section
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: `${color}`,
        }}
      />
    );
  };

  const renderList = (title, type, data) => (
    <>
      <Typography style={{ fontWeight: 600 }} variant="body1">
        {title}
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          position: "relative",
          overflow: "auto",
          maxHeight: `${type === "personas" ? 370 : 145}`,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {data.length != 0 ? (
          data.map((item) => {
            return (
              <ListItem key={item.id} role="listitem">
                <ListItemText primary={item.full_name} />
              </ListItem>
            );
          })
        ) : (
          <Box style={{ paddingTop: 20 }}>
            <Typography variant="button" display="block" gutterBottom>
              Aún no hay {type} asociadas
            </Typography>
          </Box>
        )}
      </List>
    </>
  );

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
            {renderColor()}
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
            {renderList("Tecnologías", "tecnologías", projectData.technologies)}
          </Box>
          <Divider style={{ marginBottom: 15, marginTop: 15 }} />
          <Box>
            {renderList("Personas Asignadas", "personas", projectData.people)}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
