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
  popover: {
    pointerEvents: "none",
    borderRadius: "16px !important",
    boxShadow: "0px 4px 4px 0px #00000040",
    "& > div": {
      borderRadius: "16px !important",
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
}));
