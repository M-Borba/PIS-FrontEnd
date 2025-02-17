import React, { Fragment } from "react";
import moment from "moment";
import propTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FolderIcon from "@mui/icons-material/Folder";
import { DatePicker } from "@mui/lab";

import {
  BUTTON_LABELS,
  cargasHorarias_t,
  cargasHorarias_tFormateadas,
  DATE_FORMAT,
  PERSON_LABELS,
  PROJECT_LABELS,
  roles,
  rolesTraducidos,
} from "../../config/globalVariables";
import { useStyles } from "./styles";
import { rawDateToDateFormat, renderColor } from "../../utils/utils.js";
import ListData from "../../containers/InfoProyecto/List";
import CustomButton from "../CustomButton";

InfoAsignacionDialog.propTypes = {
  asignacionInfo: propTypes.object.isRequired,
  projectName: propTypes.string.isRequired,
  personName: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
  aplicarCambios: propTypes.func.isRequired,
  desasignar: propTypes.func.isRequired,
  project: propTypes.object.isRequired,
};

function InfoAsignacionDialog({
  asignacionInfo,
  projectName,
  personName,
  project,
  onClose,
  onChange,
  aplicarCambios,
  desasignar,
}) {
  const classes = useStyles();

  const projectInfo = [
    {
      label: PROJECT_LABELS.ORGANIZACION,
      value: project.organization || "-",
    },
    {
      label: PROJECT_LABELS.TIPO_PROYECTO,
      value: project.project_type
        ?.replaceAll("_", " ")
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    },
    {
      label: PROJECT_LABELS.ESTADO,
      value: renderColor(project.project_state),
    },
    {
      label: PROJECT_LABELS.FECHA_INICIO,
      value: rawDateToDateFormat(project.start_date),
    },
    {
      label: PROJECT_LABELS.FECHA_FIN,
      value: project.end_date
        ? rawDateToDateFormat(project.end_date)
        : PROJECT_LABELS.FECHA_INDEFINIDA,
    },
  ];
  const cargasHorariasItems = cargasHorarias_t.map((cargaHoraria, id) => (
    <MenuItem key={id} value={cargaHoraria}>
      {cargasHorarias_tFormateadas[cargaHoraria]}
    </MenuItem>
  ));

  const rolItems = roles.map((rol, id) => (
    <MenuItem key={id} value={rolesTraducidos[rol]}>
      {rol}
    </MenuItem>
  ));

  const renderInformation = (title, info) => (
    <Box
      key={title}
      mt={1.5}
      style={
        title === PROJECT_LABELS.ESTADO
          ? { display: "flex", gap: "0.5rem" }
          : {}
      }
    >
      <Typography
        style={{ fontWeight: 600, fontSize: 14 }}
        variant="body1"
        display="inline"
        gutterBottom
      >
        {title}:{" "}
      </Typography>
      <Typography style={{ fontSize: 14 }} display="inline" variant="body1">
        {info}
      </Typography>
    </Box>
  );

  return (
    project && (
      <div style={{ padding: "16px" }}>
        <DialogTitle className={classes.dialogTitle}>
          <Stack direction="row" height={35} className={classes.jC_sb}>
            <div
              style={{ fontWeight: 700, display: "flex", alignItems: "center" }}
            >
              <FolderIcon style={{ height: 24, marginRight: 5 }} />{" "}
              <span style={{ marginRight: 5 }}>
                {projectName.split("-")[0]}
              </span>
              {renderColor(project.project_state)}{" "}
            </div>
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant="subtitle1">
            {personName} como {projectName.split("-")[1]}
          </Typography>
          <Divider flexItem style={{ marginBottom: 10 }} />
        </DialogTitle>
        <form onSubmit={aplicarCambios}>
          <div style={{ display: "flex" }}>
            <DialogContent className={classes.content}>
              <Stack
                spacing={1}
                divider={<Divider flexItem style={{ marginBottom: 10 }} />}
              >
                <Stack width={"100%"} spacing={1} direction="row">
                  <Stack width={"100%"}>
                    {projectInfo.map(({ label, value }) =>
                      renderInformation(label, value)
                    )}
                  </Stack>
                  <Stack width={"100%"}>
                    {project && (
                      <Fragment>
                        <Box>
                          <ListData
                            title={PROJECT_LABELS.TECNOLOGIAS}
                            type="tecnologías"
                            data={project.technologies}
                          />
                        </Box>
                        <Box>
                          <ListData
                            title={PROJECT_LABELS.PERSONAS}
                            type="personas"
                            data={project.people}
                          />
                        </Box>
                      </Fragment>
                    )}
                  </Stack>
                </Stack>
                <TextField
                  fullWidth
                  required
                  select
                  label={PERSON_LABELS.ROL}
                  name="rol"
                  value={asignacionInfo.role}
                  onChange={onChange}
                  sx={{ marginTop: 1 }}
                  InputProps={{
                    className: classes.fWidth,
                  }}
                >
                  {rolItems}
                </TextField>
                <Stack spacing={1} direction="row">
                  <TextField
                    fullWidth
                    required
                    id="working_hours"
                    label={PERSON_LABELS.CARGA_HORARIA}
                    InputProps={{ className: classes.fWidth }}
                    type="number"
                    value={asignacionInfo.working_hours}
                    onChange={onChange}
                    inputProps={{
                      min: 1,
                      max: 100,
                    }}
                  />
                  <TextField
                    fullWidth
                    InputProps={{ className: classes.fWidth }}
                    required
                    select
                    name="working_hours_type"
                    label={PERSON_LABELS.TIPO_CARGA_HORARIA}
                    value={asignacionInfo.working_hours_type}
                    onChange={onChange}
                  >
                    {cargasHorariasItems}
                  </TextField>
                </Stack>
                <Stack spacing={1} direction="row">
                  {project && (
                    <>
                      <DatePicker
                        name="start_date"
                        id="start_date"
                        disableMaskedInput
                        inputFormat={DATE_FORMAT}
                        minDate={moment(project.start_date)}
                        maxDate={
                          project.end_date ? moment(project.end_date) : null
                        }
                        value={asignacionInfo.start_date}
                        className={classes.fWidth}
                        onChange={(newDate) => onChange(newDate, "start_date")}
                        PaperProps={{
                          style: {
                            borderRadius: "16px",
                          },
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                        TextFieldProps={{
                          className: classes.fWidth,
                          InputLabelProps: { shrink: true },
                          name: "start_date",
                          required: true,
                          id: "start_date",
                          label: PROJECT_LABELS.FECHA_INICIO,
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <DatePicker
                        name="end_date"
                        id="end_date"
                        inputFormat={DATE_FORMAT}
                        disableMaskedInput
                        value={asignacionInfo.end_date || null}
                        minDate={moment(project.start_date)}
                        maxDate={
                          project.end_date ? moment(project.end_date) : null
                        }
                        className={classes.fWidth}
                        onChange={(newDate) => onChange(newDate, "end_date")}
                        PaperProps={{
                          style: {
                            borderRadius: "16px",
                          },
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                        TextFieldProps={{
                          className: classes.fWidth,
                          InputLabelProps: { shrink: true },
                          name: "end_date",
                          id: "end_date",
                          label: PROJECT_LABELS.FECHA_FIN,
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />{" "}
                    </>
                  )}
                </Stack>
              </Stack>
            </DialogContent>
          </div>
          <DialogActions
            className={classes.actions}
            style={{ justifyContent: "space-between", margin: "0 16px" }}
          >
            <CustomButton onClick={desasignar} variant="contained" redButton>
              {BUTTON_LABELS.UNASSIGN}
            </CustomButton>
            <CustomButton role="submit" type="submit" variant="contained">
              {BUTTON_LABELS.APPLY_CHANGES}
            </CustomButton>
          </DialogActions>
        </form>
      </div>
    )
  );
}

export default InfoAsignacionDialog;
