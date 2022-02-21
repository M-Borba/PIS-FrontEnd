import {
  BUTTON_LABELS,
  cargasHorarias_t,
  cargasHorarias_tFormateadas,
  DATE_FORMAT,
  HEADER_LABELS,
  PERSON_LABELS,
  PROJECT_LABELS,
  roles,
  rolesTraducidos,
} from "../../config/globalVariables";
import React, { Fragment, useState } from "react";
import { useStyles } from "../InfoAsignacionDialog/styles";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { DatePicker } from "@mui/lab";
import moment from "moment";
import CustomButton from "../CustomButton";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const Classes = useStyles();
  const cargasHorariasItems = cargasHorarias_t.map((cargaHoraria, id) => {
    return (
      <MenuItem key={id} value={cargaHoraria}>
        {cargasHorarias_tFormateadas[cargaHoraria]}
      </MenuItem>
    );
  });

  const rolItems = roles.map((role) => {
    return (
      <MenuItem key={role} value={rolesTraducidos[role]}>
        {role}
      </MenuItem>
    );
  });

  const proyectosItems = proyectos.map((proyecto) => {
    return (
      <MenuItem key={proyecto.id} value={proyecto.id}>
        {proyecto.name}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <DialogTitle>
        <Stack direction="row" className={Classes.jC_sb}>
          Asignación de proyecto a {personName}
          <IconButton
            aria-label="Close"
            className={Classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <TextField
              select
              fullWidth
              required
              autoFocus
              name="project"
              label={HEADER_LABELS.PROYECTOS}
              value={datos.project_id}
              onChange={(e) => {
                proyectos.find((proyecto) => {
                  if (proyecto.id === e.target.value) {
                    setEndDate(proyecto.end_date);
                    setStartDate(proyecto.start_date);
                  }
                });
                onInputChange(e);
              }}
              sx={{ marginTop: 1 }}
            >
              {proyectosItems}
            </TextField>
            <TextField
              select
              fullWidth
              required
              name="role"
              label={PERSON_LABELS.ROL}
              value={datos.role}
              onChange={onInputChange}
            >
              {rolItems}
            </TextField>
            <Stack spacing={1} direction="row">
              <TextField
                select
                fullWidth
                required
                name="working_hours_type"
                label={PERSON_LABELS.TIPO_CARGA_HORARIA}
                value={datos.working_hours_type}
                onChange={onInputChange}
              >
                {cargasHorariasItems}
              </TextField>
              <TextField
                style={{ width: 280 }}
                required
                variant="outlined"
                id="horas"
                label={PERSON_LABELS.CARGA_HORARIA}
                type="number"
                value={datos.working_hours}
                onChange={onInputChange}
                inputProps={{
                  min: 1,
                  max: 100,
                }}
              />
            </Stack>
            <Stack spacing={1} direction="row">
              {/*<TextField*/}
              {/*  fullWidth*/}
              {/*  required*/}
              {/*  id="fechaInicio"*/}
              {/*  variant="standard"*/}
              {/*  type="date"*/}
              {/*  label="Fecha Inicio"*/}
              {/*  InputLabelProps={{ shrink: true }}*/}
              {/*  value={datos.start_date}*/}
              {/*  onChange={onInputChange}*/}
              {/*  InputProps={{ inputProps: { max: "9999-12-31" } }}*/}
              {/*/>*/}
              {/*<MuiPickersUtilsProvider utils={MomentUtils}>*/}

              <DatePicker
                fullWidth
                required
                id="fechaInicio"
                value={startDate}
                minDate={moment(startDate)}
                maxDate={moment(endDate)}
                onChange={(e) => onInputChange(e, "start_date")}
                name="start_date"
                disableMaskedInput
                inputFormat={DATE_FORMAT}
                // className={classes.fWidth}
                PaperProps={{
                  style: {
                    borderRadius: "15px",
                  },
                }}
                inputProps={{
                  disabled: true,
                }}
                TextFieldProps={{
                  // className: classes.fWidth,
                  InputLabelProps: { shrink: true },
                  name: "start_date",
                  required: true,
                  id: "start_date",
                  label: PROJECT_LABELS.FECHA_INICIO,
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                fullWidth
                id="fechaFin"
                value={endDate}
                minDate={moment(startDate)}
                maxDate={moment(endDate)}
                onChange={(e) => onInputChange(e, "end_date")}
                name="end_date"
                disableMaskedInput
                inputFormat={DATE_FORMAT}
                // className={classes.fWidth}
                PaperProps={{
                  style: {
                    borderRadius: "15px",
                  },
                }}
                inputProps={{
                  disabled: true,
                }}
                TextFieldProps={{
                  // className: classes.fWidth,
                  InputLabelProps: { shrink: true },
                  name: "end_date",
                  required: true,
                  id: "end_date",
                  label: PROJECT_LABELS.FECHA_FIN,
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              {/*<TextField*/}
              {/*  fullWidth*/}
              {/*  id="fechaFin"*/}
              {/*  variant="standard"*/}
              {/*  type="date"*/}
              {/*  label="Fecha de fin"*/}
              {/*  InputLabelProps={{ shrink: true }}*/}
              {/*  value={datos.end_date}*/}
              {/*  onChange={onInputChange}*/}
              {/*  InputProps={{ inputProps: { max: "9999-12-31" } }}*/}
              {/*/>*/}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <CustomButton redButton onClick={onClose} variant="contained">
            {BUTTON_LABELS.CANCEL}
          </CustomButton>
          <CustomButton role="submit" type="submit" variant="contained">
            {BUTTON_LABELS.ASSIGN}
          </CustomButton>
        </DialogActions>
      </form>
    </Fragment>
  );
}

export default AsignacionDialog;
