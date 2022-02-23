import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 12),
    textAlign: "center",
  },
  list: {
    height: 250,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    marginTop: 4,
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
