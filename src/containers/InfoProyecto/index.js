import React, { useState } from "react";
import propTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import moment from "moment";
import { useSnackbar } from "notistack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import ListData from "./List";
import AddButton from "../../components/AddButton";

import { renderColor } from "../../utils/utils";
import { axiosInstance } from "../../config/axios";

InfoProyecto.propTypes = {
  projectData: propTypes.object.isRequired,
  type: propTypes.string,
  state: propTypes.string,
  onClose: propTypes.func,
};

export default function InfoProyecto({ projectData, type, state, onClose }) {
  const [project_state, setProjectState] = useState(projectData.project_state);
  const initialState = projectData.project_state;
  const { enqueueSnackbar } = useSnackbar();

  const handleApplyChanges = (e, projectData) => {
    if (initialState !== project_state) {
      projectData.project_state = project_state;
      axiosInstance
        .put(`/projects/${projectData.id}`, {
          project: projectData,
        })
        .then((response) => {
          enqueueSnackbar(
            `El proyecto ${projectData.name} se actualizó con éxito.`,
            {
              variant: "success",
              autoHideDuration: 4000,
            }
          );
        })
        .catch((error) => {
          enqueueSnackbar(
            `El proyecto ${projectData.name} no se actualizó con éxito.`,
            {
              variant: "error",
              autoHideDuration: 4000,
            }
          );
        });
    } else {
      e.preventDefault();
      onClose();
    }
  };

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
      <form
        id="timeline-proyect-change-form"
        onSubmit={(event) => handleApplyChanges(event, projectData)}
      >
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
                style={{ fontWeight: 600, alignSelf: "center" }}
                variant="body1"
                display="inline"
                gutterBottom
              >
                Estado:{" "}
              </Typography>
              <FormControl>
                <Select
                  labelId="state-input"
                  label="Estado"
                  id="project_state"
                  name="project_state"
                  style={{ width: "unset" }}
                  value={project_state}
                  onChange={(e) => {
                    setProjectState(e.target.value);
                  }}
                >
                  <MenuItem value="verde">{renderColor("verde")}</MenuItem>
                  <MenuItem value="amarillo">
                    {renderColor("amarillo")}
                  </MenuItem>
                  <MenuItem value="rojo">{renderColor("rojo")}</MenuItem>
                  <MenuItem value="upcoming">
                    {renderColor("upcoming")}
                  </MenuItem>
                </Select>
              </FormControl>
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

          <Grid
            item
            style={{ display: "flex", padding: 0, flexDirection: "column" }}
            xs={6}
          >
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
            <AddButton
              color="secondary"
              form="timeline-proyect-change-form"
              type="submit"
              variant="contained"
            >
              Aplicar cambios
            </AddButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
