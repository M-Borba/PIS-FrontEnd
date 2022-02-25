import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5, 1),
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: 550,
    minWidth: 550,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: { color: "red" },
  msg: { color: "green" },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
