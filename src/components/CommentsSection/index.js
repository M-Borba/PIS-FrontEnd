import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Button, Modal } from "@material-ui/core";

import Comment from "./Comment";
import { useStyles } from "./styles";
import NewNote from "../NewNote";

CommentsSection.propTypes = {
  notes: PropTypes.array,
};

export default function CommentsSection({ notes }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");

  const closeModal = () => setOpenModal(false);

  return (
    <div className={classes.notesContainer}>
      <Button
        className={classes.button}
        role="submit"
        type="submit"
        variant="contained"
        onClick={() => setOpenModal(true)}
      >
        Agregar nota
      </Button>
      <Modal open={openModal} onClose={closeModal} disableEnforceFocus>
        <Paper className={classes.modalInfo} variant="elevation" elevation={3}>
          <NewNote text={text} setText={setText} onClose={closeModal} />
        </Paper>
      </Modal>
      <div className={classes.commentsContainer}>
        {notes.length ? (
          notes.map(({ comment, user, id, date }) => (
            <Comment comment={comment} user={user} id={id} date={date} />
          ))
        ) : (
          <p>No hay comentarios</p>
        )}
      </div>
    </div>
  );
}
