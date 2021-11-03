import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1vw",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
