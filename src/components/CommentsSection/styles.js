import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    background: "white",
    overflowX: "hidden",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  notesContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "30px",
    marginLeft: "5px",
  },
  commentsContainer: {
    height: "calc(100vh - 200px)",
    overflow: "auto",
    padding: "0 18px 18px 5px",
  },
  button: {
    margin: "auto",
    color: COLORS.white,
    marginBottom: "18px",
    justifySelf: "flex-end",
  },
  noteContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  note: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    maxWidth: "100%",
  },
  user: { width: "100%", fontWeight: "bold", fontSize: "14px" },
  comment: { padding: "12px" },
  date: { width: "100%", textAlign: "right", fontSize: "14px" },
  delete: { width: "18px", height: "18px" },
}));
