import React, { useState } from "react";
import PropTypes from "prop-types";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useStyles } from "./styles.js";
import { PERSON_LABELS } from "../../config/globalVariables";

CardSelector.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default function CardSelector({ title, list, onInputChange }) {
  const classes = useStyles();
  const [isPeople, setIsPeople] = useState(title === PERSON_LABELS.PERSONAS);
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "unset",
      }}
      component={Paper}
    >
      <CardHeader className={classes.cardHeader} title={title} />
      <List className={classes.list} dense component="div">
        {list.map(([value, checkedValue], index) => {
          return (
            <ListItem
              key={isPeople ? value.id : value + index}
              role="listitem"
              button
              onClick={() => {
                onInputChange([value, checkedValue], title);
              }}
            >
              <ListItemIcon>
                <Checkbox
                  style={{ color: "black" }}
                  id={isPeople ? value.id : value}
                  checked={checkedValue}
                  tabIndex={-1}
                  disableRipple
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              </ListItemIcon>
              <ListItemText
                className={classes.fw400}
                primary={isPeople ? value.full_name : value}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
