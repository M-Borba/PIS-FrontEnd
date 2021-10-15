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

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}


CardSelector.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    listIds: PropTypes.array,
    onInputChange: PropTypes.func.isRequired,
};


export default function CardSelector({ title, list, listIds, onInputChange }) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);

    if (listIds != undefined)
        list = list.map((item, index) => listIds[index] + " - " + item);

    list.sort(function (a, b) {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    })

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (list) =>
        intersection(checked, list).length;

    const handleToggleAll = (list) => () => {
        if (numberOfChecked(list) === list.length) {
            setChecked(not(checked, list));
        } else {
            setChecked(union(checked, list));
        }
    };
    return (
        <Card
            style={{ display: "flex", flexDirection: "column" }}
            component={Paper}
        >
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(list)}
                        checked={
                            numberOfChecked(list) === list.length && list.length !== 0
                        }
                        indeterminate={
                            numberOfChecked(list) !== list.length &&
                            numberOfChecked(list) !== 0
                        }
                        disabled={list.length === 0}
                        onChange={onInputChange}
                    />
                }
                title={title}
            />
            <Collapse in={true} className={classes.collapse}>
                <List className={classes.list} dense component="div" role="list">
                    {list.map((value, index) => {
                        return (
                            <ListItem
                                key={value}
                                role="listitem"
                                button
                                onClick={handleToggle(value)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={onInputChange}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={value}
                                />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Collapse>
        </Card>
    );
};