import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: COLORS.white,
    borderRadius: "16px !important",
    maxWidth: 730,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    overflow: "auto",
    p: 4,
  },
  modalInfo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
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
    zIndex: 10,
    background: COLORS.white,
  },
  box: {
    display: "flex",
    padding: 8,
  },
  rightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  header: {
    position: "fixed",
    background: "white",
    width: "83%",
    zIndex: 50,
  },
  cardHeader: {
    padding: theme.spacing(1, 12),
    textAlign: "center",
    borderBottom: `2px solid ${COLORS.textFieldBorder}`,
  },
}));
