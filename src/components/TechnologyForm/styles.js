import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    width: "60%",
    marginTop: 110,
    marginRight: 32,
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
    width: "100%",
    gap: "5px",
    justifyContent: "center",
    alignContent: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    height: "50%",
    overflow: "scroll",
  },
  errorMsg: { position: "fixed", color: "red" },
}));
