import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

AsignacionDialog.propTypes = {
  proyectos: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  personName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  datos: PropTypes.object.isRequired,
};

function AsignacionDialog({
  proyectos,
  onClose,
  onSubmit,
  personName,
  onInputChange,
  datos,
}) {
  const cofirmarAsignacion = () => {
    onSubmit();
    onClose();
  };

  const selectItems = proyectos.map((proyecto) => {
    return (
      <MenuItem key={proyecto.id} value={proyecto.id}>
        {proyecto.name}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <DialogTitle>Asignacion de proyecto a {personName}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} divider={<Divider flexItem />}>
          <Fragment>
            <InputLabel id="project-select">Proyectos</InputLabel>
            <Select
              id="project"
              name="project"
              labelId="project-select"
              required={true}
              value={datos.projectId}
              onChange={onInputChange}
            >
              {selectItems}
            </Select>
          </Fragment>
          <TextField
            id="rol"
            label="Rol"
            required={true}
            variant="standard"
            value={datos.rol}
            onChange={onInputChange}
          />
          <TextField
            id="horasSemanales"
            label="Horas Semanales"
            variant="standard"
            type="number"
            required={true}
            value={datos.horasSemanales}
            onChange={onInputChange}
          />
          <Fragment>
            <InputLabel id="fecha-inicio-label">Fecha de Inicio</InputLabel>
            <TextField
              id="fechaInicio"
              variant="standard"
              required
              type="date"
              value={datos.fechaInicio}
              onChange={onInputChange}
            />
          </Fragment>
          <Fragment>
            <InputLabel id="fecha-fin-label">Fecha de Fin</InputLabel>
            <TextField
              id="fechaFin"
              variant="standard"
              type="date"
              value={datos.fechaFin}
              onChange={onInputChange}
            />
          </Fragment>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={cofirmarAsignacion}>Asignar</Button>
      </DialogActions>
    </Fragment>
  );
}

export default AsignacionDialog;
