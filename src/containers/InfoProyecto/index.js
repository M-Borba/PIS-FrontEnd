import React, { useState } from "react";
import propTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useSnackbar } from "notistack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";

import ListData from "./List";
import AddButton from "../../components/AddButton";

import { renderColor } from "../../utils/utils";
import { axiosInstance } from "../../config/axios";
import {
  BUTTON_LABELS,
  PROYECT_FORM_LABELS,
} from "../../config/globalVariables";
import TypographyStyled from "./TypographyStyled";

InfoProyecto.propTypes = {
  projectData: propTypes.object.isRequired,
  type: propTypes.string,
  onClose: propTypes.func,
};

export default function InfoProyecto({ projectData, type, onClose }) {
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
      <form onSubmit={(event) => handleApplyChanges(event, projectData)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box>
              <TypographyStyled>
                {PROYECT_FORM_LABELS.ORGANIZACION}:{" "}
              </TypographyStyled>
              <Typography display="inline" variant="body1">
                {projectData.organization || "-"}
              </Typography>
            </Box>

            <Box mt={2}>
              <TypographyStyled>
                {PROYECT_FORM_LABELS.TIPO_PROYECTO}:{" "}
              </TypographyStyled>
              <Typography display="inline" variant="body1">
                {type}
              </Typography>
            </Box>

            <Box mt={2} style={{ display: "flex", gap: "0.5rem" }}>
              <TypographyStyled style={{ alignSelf: "center" }}>
                {PROYECT_FORM_LABELS.ESTADO}:{" "}
              </TypographyStyled>
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
              <TypographyStyled>
                {PROYECT_FORM_LABELS.FECHA_INICIO}:{" "}
              </TypographyStyled>
              <Typography display="inline" variant="body1">
                {moment(projectData.start_date).format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box mt={2}>
              <TypographyStyled>
                {PROYECT_FORM_LABELS.FECHA_FIN}:{" "}
              </TypographyStyled>
              <Typography display="inline" variant="body1">
                {projectData.end_date
                  ? moment(projectData.end_date).format("DD/MM/YYYY")
                  : PROYECT_FORM_LABELS.INDEFINIDA}
              </Typography>
            </Box>

            <Box mt={2}>
              <TypographyStyled>Descripción: </TypographyStyled>
              <Typography display="inline" variant="body1">
                {projectData.description}
              </Typography>
            </Box>

            {projectData.budget && (
              <Box mt={2}>
                <TypographyStyled>
                  {PROYECT_FORM_LABELS.BUDGET}:{" "}
                </TypographyStyled>
                <Typography display="inline" variant="body1">
                  {projectData.budget}
                </Typography>
              </Box>
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
            <Grid
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Grid
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  maxHeight: "45px",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignSelf: "flex-end",
                }}
              >
                <AddButton type="submit" variant="contained">
                  {BUTTON_LABELS.APPLY_CHANGES}
                </AddButton>
              </Grid>
              <Grid
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                  alignSelf: "flex-end",
                }}
              >
                <AddButton
                  styles={{
                    backgroundColor: "#c21321",
                    maxHeight: "45px",
                    "&:hover": { backgroundColor: "#9d1e29" },
                  }}
                  variant="contained"
                  onClick={onClose}
                >
                  {BUTTON_LABELS.CANCEL}
                </AddButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
