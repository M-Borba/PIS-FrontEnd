import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    border: 0,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: { color: "red" },
}));
