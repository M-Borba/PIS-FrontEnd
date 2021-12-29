import React from "react";
import PropTypes from "prop-types";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";

NewNote.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function NewNote({ text, setText, onClose }) {
  const classes = useStyles();

  return (
    <div className={classes.newNoteContainer}>
      <div className={classes.header}>
        <Typography variant="h6">Agregar nota</Typography>
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <TextField
        multiline
        id="outlined-basic"
        label="Nueva nota"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={classes.input}
        rows={4}
      />
      <Button
        className={classes.button}
        role="submit"
        type="submit"
        variant="contained"
        onClick={onClose}
      >
        Agregar
      </Button>
    </div>
  );
}
