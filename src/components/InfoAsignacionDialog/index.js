import React from "react";
import { Box, Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import propTypes from "prop-types";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FolderIcon from "@mui/icons-material/Folder";
import moment from "moment";

import {
  cargasHorarias_t,
  cargasHorarias_tFormateadas,
  roles,
  rolesTraducidos,
} from "../../config/globalVariables";
import { useStyles } from "./styles";
import { renderColor } from "../../utils/utils.js";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/lab";

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
      mt={1.5}
      style={title === "Estado" ? { display: "flex", gap: "0.5rem" } : {}}
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
    <div style={{ padding: "16px" }}>
      <DialogTitle className={classes.dialogTitle}>
        <Stack direction="row" height={35} className={classes.jC_sb}>
          <div
            style={{ fontWeight: 700, display: "flex", alignItems: "center" }}
          >
            <FolderIcon style={{ height: 24, marginRight: 5 }} />{" "}
            <span style={{ marginRight: 5 }}>{projectName.split("-")[0]}</span>
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
              <Stack>
                {renderInformation(
                  "Organización",
                  project.organization === ""
                    ? "-"
                    : project.organization ?? "-"
                )}
                {renderInformation(
                  "Tipo proyecto",
                  project.project_type
                    ?.replaceAll("_", " ")
                    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
                )}
                {renderInformation(
                  "Estado",
                  renderColor(project.project_state)
                )}
                {renderInformation(
                  "Fecha Inicio",
                  moment(project.start_date).format("DD/MM/YYYY")
                )}
                {renderInformation(
                  "Fecha Fin",
                  project.end_date
                    ? moment(project.end_date).format("DD/MM/YYYY")
                    : "Indefinida"
                )}
              </Stack>
              <TextField
                fullWidth
                required
                select
                label="Rol"
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
                  label="Carga horaria"
                  InputProps={{ className: classes.fWidth }}
                  // variant="standard"
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
                  label="Tipo de carga horaria"
                  value={asignacionInfo.working_hours_type}
                  onChange={onChange}
                >
                  {cargasHorariasItems}
                </TextField>
              </Stack>
              <Stack spacing={1} direction="row">
                <DatePicker
                  name="start_date"
                  id="start_date"
                  value={asignacionInfo.start_date}
                  className={classes.fWidth}
                  onChange={(e) => onChange(e, "start_date")}
                  PaperProps={{
                    style: {
                      borderRadius: "15px",
                    },
                  }}
                  TextFieldProps={{
                    className: classes.fWidth,
                    InputLabelProps: { shrink: true },
                    name: "start_date",
                    required: true,
                    id: "start_date",
                    label: "Fecha Inicio",
                    type: "date",
                    InputProps: {
                      className: classes.fWidth,
                      readOnly: true,
                      inputProps: {
                        max: "9999-12-31",
                        className: classes.fWidth,
                      },
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  name="start_date"
                  id="start_date"
                  value={asignacionInfo.start_date}
                  className={classes.fWidth}
                  onChange={(e) => onChange(e, "end_date")}
                  PaperProps={{
                    style: {
                      borderRadius: "15px",
                    },
                  }}
                  TextFieldProps={{
                    className: classes.fWidth,
                    InputLabelProps: { shrink: true },
                    name: "start_date",
                    required: true,
                    id: "start_date",
                    label: "Fecha Inicio",
                    type: "date",
                    InputProps: {
                      className: classes.fWidth,
                      readOnly: true,
                      inputProps: {
                        max: "9999-12-31",
                        className: classes.fWidth,
                      },
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </Stack>
          </DialogContent>
        </div>
        <DialogActions
          className={classes.actions}
          style={{ justifyContent: "space-between", margin: "0 16px" }}
        >
          <Button
            className={classes.secondary}
            onClick={desasignar}
            variant="contained"
          >
            Desasignar
          </Button>
          <Button
            className={classes.submit}
            role="submit"
            type="submit"
            variant="contained"
          >
            Aplicar cambios
            {/*{BUTTON_LABEL.}*/}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default InfoAsignacionDialog;
