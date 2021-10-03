import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    width: "60%",
    marginTop: "15%",
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  techsChips: {
    gap: "5px",
    margin: theme.spacing(2, 4),
    justifyContent: "space-around",
    display: "flex",
    flexWrap: "wrap",
  },
  errorMsg: { position: "fixed", color: "red" },
}));
