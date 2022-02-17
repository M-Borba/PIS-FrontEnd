import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import propTypes from "prop-types";

import { renderColor } from "../../utils/utils";
import ListData from "./List";
import CustomButton from "../../components/CustomButton";
import TypographyStyled from "./TypographyStyled";
import { BUTTON_LABELS, PROJECT_LABELS } from "../../config/globalVariables";

const InfoProyectoForm = ({
  handleApplyChanges,
  projectData,
  project_state,
  setProjectState,
  onClose,
  type,
}) => {
  return (
    <form onSubmit={(event) => handleApplyChanges(event, projectData)}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box>
            <TypographyStyled>{PROJECT_LABELS.ORGANIZACION}: </TypographyStyled>
            <Typography display="inline" variant="body1">
              {projectData.organization || "-"}
            </Typography>
          </Box>

          <Box mt={2}>
            <TypographyStyled>
              {PROJECT_LABELS.TIPO_PROYECTO}:{" "}
            </TypographyStyled>
            <Typography display="inline" variant="body1">
              {type}
            </Typography>
          </Box>

          <Box mt={2} style={{ display: "flex", gap: "0.5rem" }}>
            <TypographyStyled style={{ alignSelf: "center" }}>
              {PROJECT_LABELS.ESTADO}:{" "}
            </TypographyStyled>
            <FormControl>
              <Select
                labelId="state-input"
                label={PROJECT_LABELS.ESTADO}
                id="project_state"
                name="project_state"
                style={{ width: "unset" }}
                value={project_state}
                onChange={(e) => {
                  setProjectState(e.target.value);
                }}
              >
                <MenuItem value="verde">{renderColor("verde")}</MenuItem>
                <MenuItem value="amarillo">{renderColor("amarillo")}</MenuItem>
                <MenuItem value="rojo">{renderColor("rojo")}</MenuItem>
                <MenuItem value="upcoming">{renderColor("upcoming")}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={2}>
            <TypographyStyled>{PROJECT_LABELS.FECHA_INICIO}: </TypographyStyled>
            <Typography display="inline" variant="body1">
              {moment(projectData.start_date).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box mt={2}>
            <TypographyStyled>{PROJECT_LABELS.FECHA_FIN}: </TypographyStyled>
            <Typography display="inline" variant="body1">
              {projectData.end_date
                ? moment(projectData.end_date).format("DD/MM/YYYY")
                : PROJECT_LABELS.INDEFINIDA}
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
              <TypographyStyled>{PROJECT_LABELS.BUDGET}: </TypographyStyled>
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
              xs={6}
              style={{
                display: "flex",
                flexDirection: "row",
                maxHeight: "45px",
                justifyContent: "flex-start",
                width: "100%",
                alignSelf: "flex-end",
              }}
            >
              <CustomButton
                styles={{
                  backgroundColor: "#c21321",
                  maxHeight: "45px",
                  "&:hover": { backgroundColor: "#9d1e29" },
                }}
                variant="contained"
                onClick={onClose}
              >
                {BUTTON_LABELS.CANCEL}
              </CustomButton>
            </Grid>
            <Grid
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                alignSelf: "flex-end",
              }}
            >
              <CustomButton type="submit" variant="contained">
                {BUTTON_LABELS.APPLY_CHANGES}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

InfoProyectoForm.propTypes = {
  projectData: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
  handleApplyChanges: propTypes.func.isRequired,
  project_state: propTypes.string.isRequired,
  setProjectState: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
};

export default InfoProyectoForm;
