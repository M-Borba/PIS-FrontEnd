import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "auto",
    p: 4,
  },
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // height: "75%",
    width: "40%",
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    overflowX: "hidden",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  box: {
    display: "flex",
    padding: 8,
  },
  rightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));
