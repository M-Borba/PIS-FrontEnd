import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    color: COLORS.white,
    background: COLORS.backgroundBlack,
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: COLORS.backgroundDarkGrey,
      color: COLORS.white,
    },
  },
  menuPaper: {
    maxHeight: theme.typography.pxToRem(200),
  },
}));
