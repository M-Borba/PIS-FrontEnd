import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: COLORS.white,
    borderRadius: "16px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    width: "auto",
    outline: "none",
    maxWidth: 730,
    p: 4,
  },
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    background: COLORS.white,
    border: `2px solid ${COLORS.black}`,
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
      marginTop: "-29px",
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
