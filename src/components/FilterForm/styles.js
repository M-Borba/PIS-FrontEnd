import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: "1vh 2vw",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1vw",
  },
  submit: {
    width: "50%",
  },
}));
