import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5, 1),
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
  errorMsg: { color: "red" },
  msg: { color: "green" },

  cardHeader: {
    padding: theme.spacing(1, 12),
    textAlign: "center",
  },
  list: {
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    marginTop: 4,
  },
  collapse: {
    "& .MuiCollapse-wrapperInner": {
      display: "flex",
      flexDirection: "column",
    },
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
