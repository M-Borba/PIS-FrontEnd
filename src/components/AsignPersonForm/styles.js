import { makeStyles } from "@material-ui/core/styles";

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
    color: "#ffffff",
    background: "#1c1c1c",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#404040",
      color: "#fff",
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
