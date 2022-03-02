import React from "react";
import propTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import List from "@mui/material/List";

import { useStyles } from "./styles";

const AssignExtendItems = ({ assignations, selected, setSelected }) => {
  const classes = useStyles();
  return (
    <List className={classes.list} component="div">
      {assignations.map((assignation, index) => {
        console.log(assignation);
        return (
          <ListItem
            key={assignation.id}
            button
            onClick={() => {
              let newSelected = [...selected];
              newSelected[index] = !newSelected[index];
              setSelected(newSelected);
            }}
          >
            <ListItemIcon>
              {selected[index] ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={assignation.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

AssignExtendItems.propTypes = {
  assignations: propTypes.array.isRequired,
  selected: propTypes.array,
  setSelected: propTypes.func,
};
export default AssignExtendItems;
