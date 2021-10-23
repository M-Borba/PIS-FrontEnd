import {
  cargasHorarias_t,
  cargasHorarias_tFormateadas,
  rolesFormateados,
} from "../../config/globalVariables";
import React, { Fragment } from "react";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";

InfoAsignacionDialog.propTypes = {
  asignacionInfo: propTypes.object.isRequired,
  roles: propTypes.array.isRequired,
  projectName: propTypes.string.isRequired,
  personName: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
  aplicarCambios: propTypes.func.isRequired,
  desasignar: propTypes.func.isRequired,
};

function InfoAsignacionDialog({
  asignacionInfo,
  roles,
  projectName,
  personName,
  onClose,
  onChange,
  aplicarCambios,
  desasignar,
}) {
  const Classes = useStyles();

  const cargasHorariasItems = cargasHorarias_t.map((cargaHoraria, id) => {
    return (
      <MenuItem key={id} value={cargaHoraria}>
        {cargasHorarias_tFormateadas[cargaHoraria]}
      </MenuItem>
    );
  });

  const rolItems = roles.map((rol, id) => {
    return (
      <MenuItem key={id} value={rol}>
        {rolesFormateados[rol]}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <DialogTitle className={Classes.dialogTitle}>
        <Stack direction="row" className={Classes.jC_sb}>
          <Typography variant="h6">
            {personName} en {projectName.split("-")[0]} como{" "}
            {rolesFormateados[projectName.split("-")[1].trim()]}
          </Typography>
          <IconButton
            aria-label="Close"
            className={Classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <form onSubmit={aplicarCambios}>
        <DialogContent className={Classes.content}>
          <Stack
            spacing={1}
            divider={<Divider flexItem style={{ margin: 10 }} />}
          >
            <TextField
              fullWidth
              required
              select
              label="Rol"
              name="rol"
              value={asignacionInfo.role}
              onChange={onChange}
              sx={{ marginTop: 1 }}
            >
              {rolItems}
            </TextField>
            <Stack spacing={1} direction="row">
              <TextField
                fullWidth
                required
                id="working_hours"
                label="Carga horaria"
                variant="standard"
                type="number"
                required={true}
                value={asignacionInfo.working_hours}
                onChange={onChange}
                inputProps={{ min: 1 }}
              />
              <TextField
                fullWidth
                required
                select
                name="working_hours_type"
                label="Tipo de carga horaria"
                name="working_hours_type"
                value={asignacionInfo.working_hours_type}
                onChange={onChange}
              >
                {cargasHorariasItems}
              </TextField>
            </Stack>
            <Stack spacing={1} direction="row">
              <TextField
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                id="start_date"
                label="Fecha Inicio"
                variant="standard"
                type="date"
                value={asignacionInfo.start_date}
                onChange={onChange}
                InputProps={{ inputProps: { max: "9999-12-31" } }}
              />
              <TextField
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                id="end_date"
                label="Fecha Fin"
                variant="standard"
                type="date"
                value={asignacionInfo.end_date}
                onChange={onChange}
                InputProps={{ inputProps: { max: "9999-12-31" } }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          className={Classes.actions}
          style={{ justifyContent: "space-between" }}
        >
          <Button onClick={desasignar}>desasignar</Button>
          <Button role="submit" type="submit">
            Aplicar Cambios
          </Button>
        </DialogActions>
      </form>
    </Fragment>
  );
}

export default InfoAsignacionDialog;
