import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
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
};

export default function TechnologyForm({
  onAdd,
  onRemove,
  techList,
  selectedList,
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
        options={techList}
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
      <Button
        role="submit"
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => onAdd(inputTech)}
      >
        Agregar tecnología ⬇️
      </Button>

      <div className={classes.techsChips}>
        {selectedList.map((techName) => (
          <Chip
            key={techName}
            label={techName}
            variant="outlined"
            onDelete={() => onRemove(techName)}
          />
        ))}
      </div>
    </div>
  );
}
