import React from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";
import { BUTTON_LABELS, PROJECT_LABELS } from "../../config/globalVariables";
import CustomButton from "../CustomButton";
import { TextField } from "@mui/material";

NewNote.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function NewNote({ text, setText, onClose, onSubmit }) {
  const classes = useStyles();

  return (
    <div className={classes.newNoteContainer}>
      <div className={classes.header}>
        <Typography variant="h6">{PROJECT_LABELS.AGREGAR_NOTA}</Typography>
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <TextField
        multiline
        id="outlined-basic"
        name="newNote"
        label={PROJECT_LABELS.NUEVA_NOTA}
        variant="outlined"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        InputProps={{
          style: {
            height: "fit-content",
          },
        }}
        minRows={4}
      />
      <CustomButton
        role="submit"
        type="submit"
        variant="contained"
        onClick={onSubmit}
      >
        {BUTTON_LABELS.ADD}
      </CustomButton>
    </div>
  );
}
