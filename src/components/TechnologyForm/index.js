import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useStyles } from "./styles";

const filter = createFilterOptions();
TechnologyForm.defaultProps = {
  techList: [],
  selectedList: [],
};
TechnologyForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  techList: PropTypes.array,
  inputTech: PropTypes.string,
  selectedList: PropTypes.array,
  onInputChange: PropTypes.func.isRequired,
  senioritySelected: PropTypes.string,
  setSeniority: PropTypes.func,
};

export default function TechnologyForm({
  onAdd,
  onRemove,
  techList,
  selectedList,
  senioritySelected,
  setSeniority,
  inputTech,
  onInputChange,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper} data-testid="login">
      <Autocomplete
        selectOnFocus
        isOptionEqualToValue={() => true}
        clearOnBlur
        handleHomeEndKeys
        fullWidth
        id="tech-combo-box"
        options={techList.map((obj) => obj.name)}
        value={inputTech}
        inputValue={inputTech}
        onChange={onInputChange}
        onInputChange={onInputChange}
        renderInput={(params) => <TextField {...params} label="Tecnología" />}
        renderOption={(props, option) => <li {...props}>{option}</li>}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option);
          if (inputValue !== "" && !isExisting) filtered.push(inputValue);
          return filtered;
        }}
      />
      {senioritySelected && (
        <Select
          id="seniority"
          value={senioritySelected}
          label="experiencia"
          onChange={(e) => setSeniority(e.target.value)}
        >
          <MenuItem value={"senior"}>senior</MenuItem>
          <MenuItem value={"semi-senior"}>semi-senior</MenuItem>
          <MenuItem value={"junior"}>junior</MenuItem>
        </Select>
      )}

      <Button
        role="submit"
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => onAdd([inputTech, senioritySelected])}
      >
        Agregar tecnología ⬇️
      </Button>

      <div className={classes.techsChips}>
        {senioritySelected
          ? selectedList.map(([inputTech, seniority]) => (
              <Chip
                key={inputTech}
                label={inputTech + " - " + seniority}
                variant="outlined"
                onDelete={() => onRemove([inputTech, seniority])}
              />
            ))
          : selectedList.map((inputTech) => (
              <Chip
                key={inputTech}
                label={inputTech}
                variant="outlined"
                onDelete={() => onRemove(inputTech)}
              />
            ))}
      </div>
    </div>
  );
}
