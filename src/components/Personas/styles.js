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
    width: "auto",
    p: 4,
  },
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
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
  popover: {
    pointerEvents: "none",
    boxShadow: "0px 4px 4px 0px #00000040",
    "& > div": {
      borderRadius: "16px !important",
      marginLeft: "20px",
    },
  },
  box: {
    display: "flex",
    padding: 8,
  },
  rightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonRoot: {
    fontSize: "18px",
    fontWeight: "700",
    borderRadius: "31px",
    padding: "7px 30px",
  },
}));
