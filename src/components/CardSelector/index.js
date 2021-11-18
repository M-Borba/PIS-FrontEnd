import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

CardSelector.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default function CardSelector({ title, list, onInputChange }) {
  const classes = useStyles();

  return (
    <Card
      style={{ display: "flex", flexDirection: "column" }}
      component={Paper}
    >
      <CardHeader className={classes.cardHeader} title={title} />
      <Collapse in={true} className={classes.collapse}>
        <List className={classes.list} dense component="div" role="list">
          {list.map((value, index) => {
            return (
              <ListItem
                key={value + index}
                role="listitem"
                button
                onClick={() => {
                  onInputChange(value, title);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    style={{ color: "black" }}
                    id={value[0]}
                    checked={value[1]}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={value[0]} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Collapse>
    </Card>
  );
}
