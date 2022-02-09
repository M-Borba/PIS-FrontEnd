import React from "react";
import propTypes from "prop-types";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import TodayIcon from "@mui/icons-material/Today";

import { useStyles } from "./styles";
import { InputAdornment, InputLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

FilterForm.propTypes = {
  onClear: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  project_type: propTypes.string,
  project_state: propTypes.string,
  organization: propTypes.string,
  onOrganizationChange: propTypes.func,
  onSearch: propTypes.func,
  setToday: propTypes.func,
};
FilterForm.defaultProps = {
  project_state: "",
  project_type: "",
  organization: "",
};

export default function FilterForm({
  onClear,
  onInputChange,
  project_type,
  project_state,
  organization,
  onOrganizationChange,
  onSearch,
  setToday,
}) {
  const classes = useStyles();

  const renderButton = (tooltip, onClick, iconComponent) => (
    <Tooltip title={tooltip} className={classes.form}>
      <Button
        style={{
          color: "#ffffff",
          background: "#1c1c1c",
        }}
        variant="contained"
        className={classes.clear}
        onClick={onClick}
      >
        {iconComponent}
      </Button>
    </Tooltip>
  );

  const canResetFilters = () => {
    return project_type !== "" || project_state !== "" || organization !== "";
  };

  return (
    <div
      className={classes.container}
      style={canResetFilters() ? { background: "#E2E0F2" } : null}
    >
      <form id="filter-form" className={classes.form} noValidate>
        <InputLabel>Filtrar por:</InputLabel>
        <TextField
          id="project_type"
          type="text"
          label="Tipo de proyecto"
          name="project_type"
          autoComplete="project_type"
          select
          SelectProps={{
            IconComponent: ExpandMoreIcon,
          }}
          value={project_type}
          onChange={onInputChange}
        >
          <MenuItem value="">Cualquiera</MenuItem>
          <MenuItem value="staff_augmentation">Staff Augmentation</MenuItem>
          <MenuItem value="end_to_end">End to End</MenuItem>
          <MenuItem value="tercerizado">Tercerizado</MenuItem>
          <MenuItem value="hibrido">Híbrido</MenuItem>
        </TextField>
        <TextField
          type="text"
          label="Estado del proyecto"
          onChange={onInputChange}
          id="project_state"
          name="project_state"
          select
          SelectProps={{
            IconComponent: ExpandMoreIcon,
          }}
          value={project_state}
        >
          <MenuItem value="">Cualquiera</MenuItem>
          <MenuItem value="verde">Verde</MenuItem>
          <MenuItem value="amarillo">Amarillo</MenuItem>
          <MenuItem value="rojo">Rojo</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </TextField>
        <TextField
          id="organization"
          type="text"
          label="Organización"
          name="organization"
          autoComplete="organization"
          value={organization}
          onChange={onOrganizationChange}
          inputProps={{ maxLength: 50 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/*{renderButton("Buscar", onSearch, <SearchIcon />)}*/}
        {/*{renderButton("Limpiar", onClear, "Limpiar filtros")}*/}
      </form>
      {canResetFilters() ? (
        <InputLabel className={classes.clear} onClick={onClear}>
          Limpiar filtros
        </InputLabel>
      ) : null}

      {/*{renderButton("Hoy", setToday, <TodayIcon />)}*/}
    </div>
  );
}
