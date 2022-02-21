import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  content: {
    width: "50%",
    margin: 0,
    padding: theme.spacing(2),
    paddingTop: "0 !important",
  },
  actions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    bottom: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  jC_sb: {
    justifyContent: "space-between",
  },
  working_hours_type_width: {
    with: theme.spacing(1),
  },
  fWidth: {
    width: "100%",
  },
  textClass: {
    wordWrap: "break-word",
  },
  submit: {
    color: COLORS.white,
    backgroundColor: COLORS.backgroundBlack,
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: COLORS.backgroundDarkGrey,
      color: COLORS.white,
    },
  },
  secondary: {
    color: COLORS.backgroundBlack,
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: COLORS.backgroundDarkGrey,
    },
  },
}));
