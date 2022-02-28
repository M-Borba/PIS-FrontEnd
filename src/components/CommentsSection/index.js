import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Paper } from "@material-ui/core";

import Comment from "./Comment";
import { useStyles } from "./styles";
import NewNote from "../NewNote";
import { PERSON_LABELS, PROJECT_LABELS } from "../../config/globalVariables";
import CustomButton from "../CustomButton";

CommentsSection.propTypes = {
  notes: PropTypes.array,
};

export default function CommentsSection({ notes }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");

  const closeModal = () => {
    setText("");
    setOpenModal(false);
  };

  const onSubmit = () => {
    // TODO: add note to database
    closeModal();
  };

  const onClickDelete = () => {
    //TODO: delete note from database
  };

  return (
    <div className={classes.notesContainer}>
      <CustomButton
        className={classes.button}
        role="submit"
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => setOpenModal(true)}
      >
        {PROJECT_LABELS.AGREGAR_NOTA}
      </CustomButton>
      <Modal open={openModal} onClose={closeModal} disableEnforceFocus>
        <Paper className={classes.modalInfo} variant="elevation" elevation={3}>
          <NewNote
            onSubmit={onSubmit}
            text={text}
            setText={setText}
            onClose={closeModal}
          />
        </Paper>
      </Modal>
      <div className={classes.commentsContainer}>
        {notes.length ? (
          notes.map(({ comment, user, id, date }) => (
            <Comment
              onClick={onClickDelete}
              comment={comment}
              user={user}
              id={id}
              key={id}
              date={date}
            />
          ))
        ) : (
          <p>{PERSON_LABELS.NO_HAY_COMENTARIOS}</p>
        )}
      </div>
    </div>
  );
}
